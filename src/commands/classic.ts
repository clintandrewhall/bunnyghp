import { CommandDefinition } from '../types';
import { QUERY } from '.';

export const classic: () => CommandDefinition[] = () => [
  {
    template: `hoo ${QUERY}`,
    toUrl: ({ query }) =>
      query
        ? `https://hoogle.haskell.org/?hoogle=${query}`
        : 'https://hoogle.haskell.org/',
    example: 'hoo, hoo Maybe a -> a',
    desc: 'Search Hoogle, or go to the Hoogle homepage.',
  },
  {
    template: 'rickroll',
    toUrl: () => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    desc: "You Just Got Rick Roll'd By bunnyghp!",
  },
  {
    template: `fb ${QUERY}`,
    toUrl: ({ query }) =>
      query
        ? `https://www.facebook.com/search/top?q=${query}`
        : 'https://www.facebook.com/',
    example: 'fb, fb mark zuckerberg',
    desc: 'Search Facebook, or go to the Facebook homepage.',
  },
  {
    template: `yt ${QUERY}`,
    toUrl: ({ query }) =>
      query
        ? `https://www.youtube.com/results?search_query=${query}`
        : 'https://www.youtube.com/',
    example: 'yt, yt lofi beats',
    desc: 'Search YouTube, or go to the YouTube homepage.',
  },
  {
    template: `wa ${QUERY}`,
    toUrl: ({ query }) =>
      query
        ? `https://www.wolframalpha.com/input?i=${query}`
        : 'https://www.wolframalpha.com',
    example: 'wa, wa ultimate question',
    desc: 'Search Wolfram Alpha, or go to the Wolfram Alpha homepage.',
  },
  {
    template: 'time',
    toUrl: () => 'https://time.is/',
    desc: 'Shows the current time.',
  },
];
