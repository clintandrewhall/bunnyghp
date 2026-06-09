import { CommandDefinition } from '../types';
import { namespace, NUMBER, QUERY } from '.';

export const kibana = (person?: string) => {
  const kCommands: CommandDefinition[] = [
    ...(person
      ? [
          {
            template: `me`,
            toUrl: () => `https://github.com/${person}/kibana/`,
            desc: `Go to the main branch of the ${person}/kibana repo.`,
          },
        ]
      : []),
    {
      template: `p`,
      toUrl: () =>
        `https://github.com/elastic/kibana/projects?query=is%3Aopen+author%3A%40me`,
      desc: `Go to your projects for the elastic/kibana repo.`,
    },
    {
      template: NUMBER,
      // Github resolves issue URLs to PRs when needed.
      toUrl: ({ number }) =>
        `https://github.com/elastic/kibana/issues/${number}`,
      example: '24924',
      desc: `Go to an issue, pull request for Kibana, by number.`,
    },
    {
      template: `pr ${NUMBER}`,
      toUrl: ({ number }) =>
        `https://github.com/elastic/kibana/pull/${number}`,
      example: 'pr 24924',
      desc: `Go to an elastic/kibana pull request by number.`,
    },
    {
      template: `i ${NUMBER}`,
      toUrl: ({ number }) =>
        `https://github.com/elastic/kibana/issues/${number}`,
      example: 'i 24924',
      desc: `Go to an elastic/kibana issue by number.`,
    },
    {
      template: `i ${QUERY}`,
      toUrl: ({ query }) =>
        `https://github.com/elastic/kibana/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc${
          person ? `+assignee%3A${person}` : ''
        }${query ? `+${query}` : ''}`,
      example: 'i, i test failure',
      desc: person
        ? `Go to open elastic/kibana issues for ${person}, and optionally search.`
        : `Go to elastic/kibana open issues, and optionally search.`,
    },
    {
      template: `pr ${QUERY}`,
      toUrl: ({ query }) =>
        `https://github.com/elastic/kibana/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-desc${
          person ? `+author%3A${person}` : ''
        }${query ? `+${query}` : ''}`,
      example: 'pr, pr fix failure',
      desc: person
        ? `Go to open elastic/kibana pull requests for ${person}, and optionally search.`
        : `Go to elastic/kibana open pull requests, and optionally search.`,
    },
    {
      template: `blockers :release?`,
      toUrl: ({ release }) =>
        `https://github.com/elastic/kibana/issues?q=is%3Aopen+sort%3Aupdated-desc+label%3Ablocker${
          release ? `%2Cv${release}` : ''
        }${person ? `+assignee%3A${person}` : ''}`,
      desc: person
        ? `View elastic/kibana blocker issues assigned to ${person}, and optionally filter by a release.`
        : 'View elastic/kibana blocker issues, and optionally filter by a release.',
      example: 'blockers, blockers 7.15.0',
    },
  ];

  const commands: CommandDefinition[] = [
    {
      template: `k ${QUERY}`,
      toUrl: ({ query }) =>
        query
          ? `https://github.com/elastic/kibana/search?q=${query}`
          : 'https://github.com/elastic/kibana/',
      desc: `Go to the main branch of the elastic/kibana repo, and optionally search the codebase.`,
      example: 'k, k toExpression',
    },
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
      template: `cd ${QUERY}`,
      toUrl: ({ query }) =>
        query
          ? `https://discuss.elastic.co/tags/c/elastic-stack/kibana/${query}`
          : 'https://discuss.elastic.co/c/elastic-stack/kibana',
      desc: 'View recent community discussions, optionally by tag',
      example: 'cd, cd canvas',
    },
    {
      template: `ci :release?`,
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

  return [...namespace('k', kCommands), ...commands];
};
