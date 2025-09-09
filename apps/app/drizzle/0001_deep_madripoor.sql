CREATE TYPE "public"."review_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
ALTER TABLE "transforms" ADD COLUMN "review_status" "review_status" DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE "transforms" ADD COLUMN "reviewer_id" varchar(128);--> statement-breakpoint
ALTER TABLE "transforms" ADD COLUMN "reviewed_at" timestamp with time zone;