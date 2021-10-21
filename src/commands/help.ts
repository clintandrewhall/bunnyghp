import { CommandDefinition } from '../types';

export const help: () => CommandDefinition[] = () => [
  {
    template: ':help(h|help|home)',
    toUrl: () => `/`,
    example: 'h|help|home',
    desc: 'View how to use bunnyghp.',
  },
];
