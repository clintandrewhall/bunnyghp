import { CommandDefinition } from '../types';
import { OPTIONAL_SPACE, QUERY } from '.';

const ZIP_CODE = `:zip(\\d{5})`;

export const classic: () => CommandDefinition[] = () => [
  {
    template: 'lol',
    toUrl: () => 'http://icanhascheezburger.com/?random',
    desc: 'a random lolcat',
  },
  {
    template: 'hoo :query',
    toUrl: ({ query }) => `http://haskell.org/hoogle/?q=${query}`,
    example: 'hoo how to hoogle',
    desc: 'a hoogle (haskell + google) search',
  },
  {
    template: 'rickroll',
    toUrl: () => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    desc: "You Just Got Rick Roll'd By bunnyghp!",
  },
  {
    template: `fb${QUERY}`,
    toUrl: ({ query }) =>
      `http://www.facebook.com/${query ? `s.php?q=${query}&init=q` : ''}`,
    desc: 'search www.facebook.com or go there',
    example: 'fb mark zuckerberg',
  },
  {
    template: `yt${QUERY}`,
    toUrl: ({ query }) =>
      `http://www.youtube.com/${
        query ? `results?search_query=${query}&search_type=&aq=-1&oq=` : ''
      }`,
    desc: 'searches YouTube or goes to it',
    example: "yt i'm cool sushi 654 yeah",
  },
  {
    template: `bugcongress${OPTIONAL_SPACE}${ZIP_CODE}?`,
    toUrl: ({ zip }) =>
      `http://www.congress.org/congressorg/officials/congress/${
        zip ? `?lvl=C&azip=${zip}` : ''
      }`,
    desc: 'looks up your senator or congressperson based on a zip code you give it, or just view a list',
    example: 'bugcongress 40207',
  },
  {
    template: `wa${QUERY}`,
    toUrl: ({ query }) =>
      `http://www.wolframalpha.com${query ? `/input/?i=${query}` : ''}`,
    desc: 'searches Wolfram Alpha or goes there',
    example: 'wa ultimate question',
  },
  {
    template: `wikinvest${QUERY}`,
    toUrl: ({ query }) =>
      `http://www.wikinvest.com${
        query ? `/Special/Search?search=%s${query}` : ''
      }`,
    desc: 'searches Wikinvest or goes there',
    example: 'wikinvest 2008 Financial Crisis',
  },
  {
    template: 'time',
    toUrl: () => 'https://time.is/',
    desc: 'shows the current time',
  },
];
