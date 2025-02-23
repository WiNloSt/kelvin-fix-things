import * as migration_20250209_150009 from './20250209_150009';
import * as migration_20250210_183802 from './20250210_183802';
import * as migration_20250223_111848_post_likes from './20250223_111848_post_likes';

export const migrations = [
  {
    up: migration_20250209_150009.up,
    down: migration_20250209_150009.down,
    name: '20250209_150009',
  },
  {
    up: migration_20250210_183802.up,
    down: migration_20250210_183802.down,
    name: '20250210_183802',
  },
  {
    up: migration_20250223_111848_post_likes.up,
    down: migration_20250223_111848_post_likes.down,
    name: '20250223_111848_post_likes'
  },
];
