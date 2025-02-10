import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "media_sizes_small_sizes_small_filename_idx";
  DROP INDEX IF EXISTS "media_sizes_large_sizes_large_filename_idx";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_small_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_small_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_small_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_small_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_small_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_small_filename";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_large_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_large_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_large_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_large_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_large_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_large_filename";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" ADD COLUMN "sizes_small_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_small_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_small_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_small_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_small_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_small_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_large_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_large_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_large_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_large_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_large_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_large_filename" varchar;
  CREATE INDEX IF NOT EXISTS "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");`)
}
