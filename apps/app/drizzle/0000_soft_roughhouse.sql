CREATE TYPE "public"."output_kind" AS ENUM('semantic_html', 'metrics');--> statement-breakpoint
CREATE TYPE "public"."transform_status" AS ENUM('queued', 'running', 'success', 'failed', 'skipped');--> statement-breakpoint
CREATE TYPE "public"."usage_event" AS ENUM('request', 'cache_hit', 'generated', 'validation_failed', 'error', 'reviewed', 'activated');--> statement-breakpoint
CREATE TABLE "api_keys" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"org_id" varchar(128) NOT NULL,
	"name" varchar(128),
	"key_hash" varchar(128) NOT NULL,
	"last_used_at" timestamp with time zone,
	"revoked_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "changes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"transform_id" uuid NOT NULL,
	"from_tag" varchar(32) NOT NULL,
	"to_tag" varchar(32) NOT NULL,
	"reason" text,
	"confidence" varchar(16),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "domains" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"org_id" varchar(128) NOT NULL,
	"domain" varchar(255) NOT NULL,
	"verified" boolean DEFAULT false NOT NULL,
	"verification_token" varchar(64) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "outputs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"transform_id" uuid NOT NULL,
	"kind" "output_kind" NOT NULL,
	"body" jsonb NOT NULL,
	"confidence" varchar(16),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"org_id" varchar(128) NOT NULL,
	"url" text NOT NULL,
	"title" text,
	"type" varchar(32),
	"content_hash" varchar(128) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transforms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"org_id" varchar(128) NOT NULL,
	"page_id" uuid NOT NULL,
	"input_hash" varchar(128) NOT NULL,
	"idempotency_key" varchar(128),
	"engine" varchar(128),
	"status" "transform_status" DEFAULT 'queued' NOT NULL,
	"error" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "usage_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"org_id" varchar(128) NOT NULL,
	"page_id" uuid,
	"transform_id" uuid,
	"event" "usage_event" NOT NULL,
	"meta" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "changes" ADD CONSTRAINT "changes_transform_id_transforms_id_fk" FOREIGN KEY ("transform_id") REFERENCES "public"."transforms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "outputs" ADD CONSTRAINT "outputs_transform_id_transforms_id_fk" FOREIGN KEY ("transform_id") REFERENCES "public"."transforms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transforms" ADD CONSTRAINT "transforms_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usage_logs" ADD CONSTRAINT "usage_logs_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usage_logs" ADD CONSTRAINT "usage_logs_transform_id_transforms_id_fk" FOREIGN KEY ("transform_id") REFERENCES "public"."transforms"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "api_keys_key_hash_unique" ON "api_keys" USING btree ("key_hash");--> statement-breakpoint
CREATE INDEX "api_keys_org_idx" ON "api_keys" USING btree ("org_id");--> statement-breakpoint
CREATE INDEX "changes_transform_idx" ON "changes" USING btree ("transform_id");--> statement-breakpoint
CREATE UNIQUE INDEX "domains_org_domain_unique" ON "domains" USING btree ("org_id","domain");--> statement-breakpoint
CREATE INDEX "domains_domain_idx" ON "domains" USING btree ("domain");--> statement-breakpoint
CREATE INDEX "domains_org_idx" ON "domains" USING btree ("org_id");--> statement-breakpoint
CREATE UNIQUE INDEX "outputs_transform_kind_unique" ON "outputs" USING btree ("transform_id","kind");--> statement-breakpoint
CREATE UNIQUE INDEX "pages_org_url_unique" ON "pages" USING btree ("org_id","url");--> statement-breakpoint
CREATE INDEX "pages_content_hash_idx" ON "pages" USING btree ("content_hash");--> statement-breakpoint
CREATE INDEX "pages_org_idx" ON "pages" USING btree ("org_id");--> statement-breakpoint
CREATE UNIQUE INDEX "transforms_page_input_unique" ON "transforms" USING btree ("page_id","input_hash");--> statement-breakpoint
CREATE INDEX "transforms_org_created_idx" ON "transforms" USING btree ("org_id","created_at");