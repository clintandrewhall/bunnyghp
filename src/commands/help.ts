import { CommandDefinition } from '../types';
import { ROOT } from '../constants';

export const help: () => CommandDefinition[] = () => [
  {
    template: ':help(h|help|home)',
    toUrl: () => ROOT,
    example: 'h|help|home',
    desc: 'View how to use bunnyghp.',
  },
];
