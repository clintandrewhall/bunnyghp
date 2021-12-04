// TODO: remove this from this repo when the fork is (hopefully) deployed itself.

import { CommandDefinition } from '../types';
import { QUERY, OPTIONAL_SPACE, NUMBER, sortCommandDefinitions } from '.';

export const kibana = (person?: string) => {
  let personCommands: CommandDefinition[] = [];

  if (person) {
    personCommands = [
      {
        template: `i${QUERY}`,
        toUrl: ({ query }) =>
          `https://github.com/elastic/kibana/issues?q=is%3Aissue+is%3Aopen+assignee%3A${person}+archived%3Afalse+sort%3Aupdated-desc${
            query ? `+${query}` : ''
          }`,
        example: 'i, i flaky test',
        desc: `Go to open Kibana issues for ${person}, and optionally search.`,
      },
      {
        template: `pr${QUERY}`,
        toUrl: ({ query }) =>
          `https://github.com/pulls?q=is%3Apr+is%3Aopen+author%3A${person}+archived%3Afalse+sort%3Aupdated-desc${
            query ? `+${query}` : ''
          }`,
        example: 'pr, pr test fix',
        desc: `Go to open Kibana pull requests for ${person}, and optionally search.`,
      },
      {
        template: `blockers${OPTIONAL_SPACE}:release?`,
        toUrl: ({ release }) =>
          `https://github.com/elastic/kibana/issues?q=is%3Aopen+assignee%3A${person}+sort%3Aupdated-desc+label%3Ablocker${
            release ? `%2Cv${release}` : ''
          }`,
        desc: `View Kibana blocker issues assigned to ${person}, and optionally filter by a release.`,
        example: 'blockers, blockers 7.15.0',
      },
      {
        template: `k me`,
        toUrl: () => `https://github.com/${person}/kibana/`,
        desc: `Go to the main branch of the ${person}/kibana repo.`,
      },
    ];
    personCommands = personCommands.sort(sortCommandDefinitions);
  }

  const commands: CommandDefinition[] = [
    {
      template: `n`,
      toUrl: () =>
        `https://github.com/notifications?query=repo%3Aelastic%2Fkibana+is%3Aunread`,
      desc: 'View unread notifications for elastic/kibana',
    },
    {
      template: `t :team`,
      toUrl: ({ team }) =>
        `https://github.com/orgs/elastic/teams/kibana-${team}`,
      desc: 'Go to a Kibana Team homepage on Github.',
      example: 't ops, t presentation',
    },
    {
      template: `tl :team`,
      toUrl: ({ team }) =>
        `https://github.com/elastic/kibana/labels/Team%3A${team}`,
      desc: "Go to a team's issue/pr label.",
      example: 'tl, tl presentation',
    },
    {
      template: `k${QUERY}`,
      toUrl: ({ query }) =>
        query
          ? `https://github.com/elastic/kibana/search?q=${query}`
          : 'https://github.com/elastic/kibana/',
      desc: `Go to the main branch of the elastic/kibana repo, and optionally search the codebase.`,
      example: 'k, k toExpression',
    },
    {
      template: `k ${NUMBER}`,
      // Github will automatically resolve if issue is a pr,, vice versa.
      toUrl: ({ number }) =>
        `https://github.com/elastic/kibana/issues/${number}`,
      example: 'k 24924',
      desc: `Go to an issue, pull request for Kibana, by number.`,
    },
    {
      template: `k i${QUERY}`,
      toUrl: ({ query }) =>
        `https://github.com/elastic/kibana/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc${
          query ? `+${query}` : ''
        }`,
      example: 'k i, k i test failure',
      desc: `Go to Kibana open issues, and optionally search`,
    },
    {
      template: `k pr${QUERY}`,
      toUrl: ({ query }) =>
        `https://github.com/elastic/kibana/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-desc${
          query ? `+${query}` : ''
        }`,
      example: 'k pr, k pr fix failure',
      desc: `Go to Kibana open pull requests, and optionally search`,
    },
    {
      template: `k blockers${OPTIONAL_SPACE}:release?`,
      toUrl: ({ release }) =>
        `https://github.com/elastic/kibana/issues?q=is%3Aopen+sort%3Aupdated-desc+label%3Ablocker${
          release ? `%2Cv${release}` : ''
        }`,
      desc: 'View Kibana blocker issues, and optionally filter by a release.',
      example: 'k blockers, k blockers 7.15.0',
    },
    {
      template: `cd${QUERY}`,
      toUrl: ({ query }) =>
        query
          ? `https://discuss.elastic.co/tags/c/elastic-stack/kibana/${query}`
          : 'https://discuss.elastic.co/c/elastic-stack/kibana',
      desc: 'View recent community discussions, optionally by tag',
      example: 'cd, cd canvas',
    },
    {
      template: `ci${OPTIONAL_SPACE}:release?`,
      toUrl: ({ release }) =>
        `https://kibana-ci.elastic.co/${
          release ? `job/elastic+kibana+${release}` : ''
        }`,
      example: 'ci, ci 7.15',
      desc: 'Go to CI, and optionally the build for a specific Kibana release.',
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

  return [...personCommands, ...commands.sort(sortCommandDefinitions)];
};
