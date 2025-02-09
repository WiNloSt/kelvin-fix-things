import * as migration_20250209_150009 from './20250209_150009';

export const migrations = [
  {
    up: migration_20250209_150009.up,
    down: migration_20250209_150009.down,
    name: '20250209_150009'
  },
];
