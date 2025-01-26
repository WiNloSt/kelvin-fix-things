import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_links" ADD COLUMN "link_enabled" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_enabled" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_enabled" boolean DEFAULT true;
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "link_enabled" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_enabled" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_enabled" boolean DEFAULT true;
  ALTER TABLE "header_nav_items" ADD COLUMN "link_enabled" boolean DEFAULT true;
  ALTER TABLE "footer_nav_items" ADD COLUMN "link_enabled" boolean DEFAULT true;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_links" DROP COLUMN IF EXISTS "link_enabled";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN IF EXISTS "link_enabled";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN IF EXISTS "link_enabled";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN IF EXISTS "link_enabled";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN IF EXISTS "link_enabled";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN IF EXISTS "link_enabled";
  ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "link_enabled";
  ALTER TABLE "footer_nav_items" DROP COLUMN IF EXISTS "link_enabled";`)
}
