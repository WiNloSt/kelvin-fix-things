import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "post_likes_relations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"post_id" integer NOT NULL,
  	"user_uuid" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "post_likes_relations_id" integer;
  DO $$ BEGIN
   ALTER TABLE "post_likes_relations" ADD CONSTRAINT "post_likes_relations_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "post_likes_relations_post_idx" ON "post_likes_relations" USING btree ("post_id");
  CREATE INDEX IF NOT EXISTS "post_likes_relations_updated_at_idx" ON "post_likes_relations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "post_likes_relations_created_at_idx" ON "post_likes_relations" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_post_likes_relations_fk" FOREIGN KEY ("post_likes_relations_id") REFERENCES "public"."post_likes_relations"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_post_likes_relations_id_idx" ON "payload_locked_documents_rels" USING btree ("post_likes_relations_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "post_likes_relations" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "post_likes_relations" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_post_likes_relations_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_post_likes_relations_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "post_likes_relations_id";`)
}
