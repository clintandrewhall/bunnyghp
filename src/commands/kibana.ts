// TODO: remove this from this repo when the fork is (hopefully) deployed itself.

import { CommandDefinition } from '../types';
import { QUERY, OPTIONAL_SPACE, NUMBER } from '.';

export const kibana: () => CommandDefinition[] = () => [
  {
    template: `${NUMBER}`,
    // Github will automatically resolve if issue is a pr, or vice versa.
    toUrl: ({ number }) => `https://github.com/elastic/kibana/issues/${number}`,
    example: '24924',
    desc: `Go to an issue or pull request for Kibana, by number.`,
  },
  {
    template: `i${QUERY}`,
    toUrl: ({ query }) =>
      `https://github.com/elastic/kibana/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc${
        query ? `+${query}` : ''
      }`,
    example: "'i' or 'i test failure'",
    desc: `Go to open issues, and optionally search`,
  },
  {
    template: `pr${QUERY}`,
    toUrl: ({ query }) =>
      `https://github.com/elastic/kibana/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-desc${
        query ? `+${query}` : ''
      }`,
    example: "'pr' or 'pr fix failure'",
    desc: `Go to open pull requests, and optionally search`,
  },
  {
    template: `n`,
    toUrl: () =>
      `https://github.com/notifications?query=repo%3Aelastic%2Fkibana+is%3Aunread`,
    desc: 'View unread notifications for elastic/kibana',
  },
  {
    template: `t :team`,
    toUrl: ({ team }) => `https://github.com/orgs/elastic/teams/kibana-${team}`,
    desc: 'Go to a Kibana Team homepage on Github.',
    example: "'t ops' or 't presentation'",
  },
  {
    template: `tl :team`,
    toUrl: ({ team }) =>
      `https://github.com/elastic/kibana/labels/Team%3A${team}`,
    desc: "Go to a team's issue/pr label.",
    example: "'tl' or 'tl presentation'",
  },
  {
    template: `blockers${OPTIONAL_SPACE}:release?`,
    toUrl: ({ release }) =>
      `https://github.com/elastic/kibana/issues?q=is%3Aopen+sort%3Aupdated-desc+label%3Ablocker${
        release ? `%2Cv${release}` : ''
      }`,
    desc: 'View blocker issues, and optionally filter by a release.',
    example: "'blockers' or 'blockers 7.15.0'",
  },
  {
    template: `cd${QUERY}`,
    toUrl: ({ query }) =>
      query
        ? `https://discuss.elastic.co/tags/c/elastic-stack/kibana/${query}`
        : 'https://discuss.elastic.co/c/elastic-stack/kibana',
    desc: 'View recent community discussions, optionally by tag',
    example: "'cd' or 'cd canvas'",
  },
  {
    template: `ci${OPTIONAL_SPACE}:release?`,
    toUrl: ({ release }) =>
      `https://kibana-ci.elastic.co/${
        release ? `job/elastic+kibana+${release}` : ''
      }`,
    example: "'ci' or 'ci 7.15'",
    desc: 'Go to CI, and optionally the build for a specific Kibana release.',
  },
  {
    template: `main`,
    toUrl: () => `https://github.com/elastic/kibana`,
    desc: 'Go to the main branch of the Kibana repository.',
  },
  {
    template: `eui`,
    toUrl: () => `https://github.com/elastic/eui`,
    desc: 'Go to the main branch of the EUI repository.',
  },
  {
    template: `docs`,
    toUrl: () =>
      `https://docs.elastic.dev/kibana-dev-docs/getting-started/welcome`,
    desc: 'Visit the Kibana Dev Docs.',
  },
];
