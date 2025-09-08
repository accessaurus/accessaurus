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

// Enums
export const generationStatus = pgEnum('generation_status', [
  'queued',
  'running',
  'success',
  'failed',
  'skipped',
])

export const outputKind = pgEnum('output_kind', ['meta', 'jsonld', 'synonyms'])

export const usageEvent = pgEnum('usage_event', [
  'request',
  'cache_hit',
  'generated',
  'validation_failed',
  'error',
  'reviewed',
  'activated',
])

// Core tables
export const tenants = pgTable('tenants', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 128 }).notNull(),
  slug: varchar('slug', { length: 128 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
})

export const domains = pgTable(
  'domains',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    tenantId: uuid('tenant_id')
      .notNull()
      .references(() => tenants.id, { onDelete: 'cascade' }),
    domain: varchar('domain', { length: 255 }).notNull(),
    verified: boolean('verified').notNull().default(false),
    verificationToken: varchar('verification_token', { length: 64 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    tenantDomainUnique: uniqueIndex('domains_tenant_domain_unique').on(
      t.tenantId,
      t.domain,
    ),
    domainIdx: index('domains_domain_idx').on(t.domain),
  }),
)

export const apiKeys = pgTable(
  'api_keys',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    tenantId: uuid('tenant_id')
      .notNull()
      .references(() => tenants.id, { onDelete: 'cascade' }),
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
    tenantIdx: index('api_keys_tenant_idx').on(t.tenantId),
  }),
)

export const contentItems = pgTable(
  'content_items',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    tenantId: uuid('tenant_id')
      .notNull()
      .references(() => tenants.id, { onDelete: 'cascade' }),
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
    tenantUrlUnique: uniqueIndex('content_items_tenant_url_unique').on(
      t.tenantId,
      t.url,
    ),
    contentHashIdx: index('content_items_content_hash_idx').on(t.contentHash),
  }),
)

export const generations = pgTable(
  'generations',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    tenantId: uuid('tenant_id')
      .notNull()
      .references(() => tenants.id, { onDelete: 'cascade' }),
    contentItemId: uuid('content_item_id')
      .notNull()
      .references(() => contentItems.id, { onDelete: 'cascade' }),
    inputHash: varchar('input_hash', { length: 128 }).notNull(),
    idempotencyKey: varchar('idempotency_key', { length: 128 }),
    model: varchar('model', { length: 128 }).notNull(),
    status: generationStatus('status').notNull().default('queued'),
    error: text('error'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    completedAt: timestamp('completed_at', { withTimezone: true }),
  },
  (t) => ({
    idempotentUnique: uniqueIndex('generations_content_input_unique').on(
      t.contentItemId,
      t.inputHash,
    ),
    tenantCreatedIdx: index('generations_tenant_created_idx').on(
      t.tenantId,
      t.createdAt,
    ),
  }),
)

export const outputs = pgTable(
  'outputs',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    generationId: uuid('generation_id')
      .notNull()
      .references(() => generations.id, { onDelete: 'cascade' }),
    kind: outputKind('kind').notNull(),
    body: jsonb('body').notNull(),
    confidence: varchar('confidence', { length: 16 }), // e.g. "0.92"
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    generationKindUnique: uniqueIndex('outputs_generation_kind_unique').on(
      t.generationId,
      t.kind,
    ),
  }),
)

export const usageLogs = pgTable('usage_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id')
    .notNull()
    .references(() => tenants.id, { onDelete: 'cascade' }),
  contentItemId: uuid('content_item_id').references(() => contentItems.id, {
    onDelete: 'set null',
  }),
  generationId: uuid('generation_id').references(() => generations.id, {
    onDelete: 'set null',
  }),
  event: usageEvent('event').notNull(),
  meta: jsonb('meta'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
})

