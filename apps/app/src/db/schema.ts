import {
  boolean,
  index,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  uniqueIndex,
} from 'drizzle-orm/pg-core'

export const transformStatus = pgEnum('transform_status', [
  'queued',
  'running',
  'success',
  'failed',
  'skipped',
])

export const outputKind = pgEnum('output_kind', ['semantic_html', 'metrics'])

export const reviewStatus = pgEnum('review_status', ['pending', 'approved', 'rejected'])

export const usageEvent = pgEnum('usage_event', [
  'request',
  'cache_hit',
  'generated',
  'validation_failed',
  'error',
  'reviewed',
  'activated',
])

export const domains = pgTable(
  'domains',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    orgId: varchar('org_id', { length: 128 }).notNull(),
    domain: varchar('domain', { length: 255 }).notNull(),
    verified: boolean('verified').notNull().default(false),
    verificationToken: varchar('verification_token', { length: 64 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    orgDomainUnique: uniqueIndex('domains_org_domain_unique').on(
      t.orgId,
      t.domain,
    ),
    domainIdx: index('domains_domain_idx').on(t.domain),
    orgIdx: index('domains_org_idx').on(t.orgId),
  }),
)

export const apiKeys = pgTable(
  'api_keys',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    orgId: varchar('org_id', { length: 128 }).notNull(),
    name: varchar('name', { length: 128 }),
    keyHash: varchar('key_hash', { length: 128 }).notNull(),
    lastUsedAt: timestamp('last_used_at', { withTimezone: true }),
    revokedAt: timestamp('revoked_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    keyHashUnique: uniqueIndex('api_keys_key_hash_unique').on(t.keyHash),
    orgIdx: index('api_keys_org_idx').on(t.orgId),
  }),
)

export const pages = pgTable(
  'pages',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    orgId: varchar('org_id', { length: 128 }).notNull(),
    url: text('url').notNull(),
    title: text('title'),
    type: varchar('type', { length: 32 }),
    contentHash: varchar('content_hash', { length: 128 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    orgUrlUnique: uniqueIndex('pages_org_url_unique').on(
      t.orgId,
      t.url,
    ),
    contentHashIdx: index('pages_content_hash_idx').on(t.contentHash),
    orgIdx: index('pages_org_idx').on(t.orgId),
  }),
)

export const transforms = pgTable(
  'transforms',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    orgId: varchar('org_id', { length: 128 }).notNull(),
    pageId: uuid('page_id')
      .notNull()
      .references(() => pages.id, { onDelete: 'cascade' }),
    inputHash: varchar('input_hash', { length: 128 }).notNull(),
    idempotencyKey: varchar('idempotency_key', { length: 128 }),
    engine: varchar('engine', { length: 128 }),
    status: transformStatus('status').notNull().default('queued'),
    error: text('error'),
    reviewStatus: reviewStatus('review_status').notNull().default('pending'),
    reviewerId: varchar('reviewer_id', { length: 128 }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    completedAt: timestamp('completed_at', { withTimezone: true }),
    reviewedAt: timestamp('reviewed_at', { withTimezone: true }),
  },
  (t) => ({
    idempotentUnique: uniqueIndex('transforms_page_input_unique').on(
      t.pageId,
      t.inputHash,
    ),
    orgCreatedIdx: index('transforms_org_created_idx').on(
      t.orgId,
      t.createdAt,
    ),
  }),
)

export const outputs = pgTable(
  'outputs',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    transformId: uuid('transform_id')
      .notNull()
      .references(() => transforms.id, { onDelete: 'cascade' }),
    kind: outputKind('kind').notNull(),
    body: jsonb('body').notNull(),
    confidence: varchar('confidence', { length: 16 }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    transformKindUnique: uniqueIndex('outputs_transform_kind_unique').on(
      t.transformId,
      t.kind,
    ),
  }),
)

export const changes = pgTable(
  'changes',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    transformId: uuid('transform_id')
      .notNull()
      .references(() => transforms.id, { onDelete: 'cascade' }),
    fromTag: varchar('from_tag', { length: 32 }).notNull(),
    toTag: varchar('to_tag', { length: 32 }).notNull(),
    reason: text('reason'),
    confidence: varchar('confidence', { length: 16 }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    transformIdx: index('changes_transform_idx').on(t.transformId),
  }),
)

export const usageLogs = pgTable('usage_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  orgId: varchar('org_id', { length: 128 }).notNull(),
  pageId: uuid('page_id').references(() => pages.id, {
    onDelete: 'set null',
  }),
  transformId: uuid('transform_id').references(() => transforms.id, {
    onDelete: 'set null',
  }),
  event: usageEvent('event').notNull(),
  meta: jsonb('meta'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
})
