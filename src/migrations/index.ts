import * as migration_20250126_081129_blank_migration from './20250126_081129_blank_migration';
import * as migration_20250126_082220_add_enabled_to_links from './20250126_082220_add_enabled_to_links';

export const migrations = [
  {
    up: migration_20250126_081129_blank_migration.up,
    down: migration_20250126_081129_blank_migration.down,
    name: '20250126_081129_blank_migration',
  },
  {
    up: migration_20250126_082220_add_enabled_to_links.up,
    down: migration_20250126_082220_add_enabled_to_links.down,
    name: '20250126_082220_add_enabled_to_links'
  },
];
