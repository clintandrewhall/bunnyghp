import { CommandDefinition } from '../types';
import { QUERY } from '.';

export const google: () => CommandDefinition[] = () => [
  {
    template: `g${QUERY}`,
    toUrl: ({ query }) =>
      `https://www.google.com${query ? `/search?q=${query}` : ''}`,
    example: 'g how to google',
    desc: 'Search Google, or just go to Google.',
  },
];
