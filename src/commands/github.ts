import { AppParams, CommandDefinition, CommandFn } from '../types';
import { namespace, NUMBER, PERSON, QUERY, REPO } from '.';

const ASSET = `:asset(pr|issue|i)`;

const assetPath = (type: string, plural = false) => {
  switch (type) {
    case 'pr':
      return plural ? 'pulls' : 'pull';
    case 'issue':
    case 'i':
      return 'issues';
    default:
      return '';
  }
};

const assetSearchType = (type: string) => (type === 'pr' ? 'pr' : 'issue');

const ghNamespace = (definitions: CommandDefinition[]) =>
  namespace('gh', definitions);

const ghAndRootNamespace = (definitions: CommandDefinition[]) =>
  namespace(['', 'gh'], definitions);

const personCommands: CommandFn = () =>
  ghNamespace([
    {
      template: PERSON,
      toUrl: ({ person }) => `https://github.com/${person}`,
      example: 'johndoe',
      desc: "Go to a person's Github profile.",
    },
  ]);

const personalSearchCommands: CommandFn = (person) =>
  ghAndRootNamespace([
    {
      template: `i${QUERY}`,
      toUrl: ({ query }) =>
        `https://github.com/issues?q=is%3Aissue+is%3Aopen+author%3A${person}+archived%3Afalse+sort%3Aupdated-desc${
          query ? `+${query}` : ''
        }`,
      example: 'i, i flaky test',
      desc: 'Go to your open issues, and optionally search.',
    },
    {
      template: `pr${QUERY}`,
      toUrl: ({ query }) => {
        if (query) {
          return `https://github.com/pulls?q=is%3Apr+is%3Aopen+author%3A${person}+archived%3Afalse+sort%3Aupdated-desc+${query}`;
        }

        // GitHub's PR dashboard is broader than authored PRs.
        return `https://github.com/pulls`;
      },
      example: 'pr, pr test fix',
      desc: 'Go to your open pull requests, and optionally search.',
    },
  ]);

const me: CommandFn = (person) => [
  ...ghNamespace([
    {
      template: `me`,
      toUrl: () => `https://github.com/${person}`,
      desc: 'Go to your Github profile.',
    },
    {
      template: `p`,
      toUrl: () => `https://github.com/${person}?tab=projects`,
      desc: 'Go to your projects.',
    },
  ]),
  ...personalSearchCommands(person),
];

const repoCommands: CommandFn = (repo) =>
  ghNamespace([
    {
      template: `${ASSET} ${NUMBER}`,
      toUrl: ({ asset, number }) =>
        `https://github.com/${repo}/${assetPath(asset)}/${number}`,
      example: 'pr|i|issue 123',
      desc: `Go to an issue or pull request for ${repo} by number.`,
    },
    {
      template: NUMBER,
      toUrl: ({ number }) => `https://github.com/${repo}/issues/${number}`,
      example: '123',
      desc: `Go to an issue or pull request for ${repo} by number.`,
    },
    {
      template: `r p`,
      toUrl: () =>
        `https://github.com/${repo}/projects?query=is%3Aopen+author%3A%40me`,
      example: 'r p',
      desc: `Go to your projects for ${repo}.`,
    },
    {
      template: `r ${ASSET}`,
      toUrl: ({ asset }) =>
        `https://github.com/${repo}/${assetPath(
          asset,
          true,
        )}?q=is%3A${assetSearchType(asset)}+is%3Aopen+sort%3Aupdated-desc`,
      example: 'r pr|i|issue',
      desc: `Go to open issues or pull requests for ${repo}.`,
    },
    {
      template: `r ${NUMBER}`,
      toUrl: ({ number }) => `https://github.com/${repo}/issues/${number}`,
      example: 'r 123',
      desc: `Go to open issues or pull requests for ${repo} by number.`,
    },
    {
      template: `r`,
      toUrl: () => `https://github.com/${repo}`,
      desc: `Go to ${repo}.`,
    },
  ]);

const standard: CommandFn = () =>
  ghNamespace([
    {
      template: `${REPO} ${ASSET} ${NUMBER}`,
      toUrl: ({ repo, asset, number }) =>
        `https://github.com/${repo}/${assetPath(asset)}/${number}`,
      example: 'johndoe/repo pr|i|issue 123',
      desc: "Go to a repo's Github issue or pull request by number.",
    },
    {
      template: `${REPO} ${NUMBER}`,
      toUrl: ({ repo, number }) =>
        `https://github.com/${repo}/issues/${number}`,
      example: 'johndoe/repo 123',
      desc: "Go to a repo's Github issue or pull request by number.",
    },
    {
      template: `${REPO} ${ASSET}`,
      toUrl: ({ repo, asset }) =>
        `https://github.com/${repo}/${assetPath(
          asset,
          true,
        )}?q=is%3A${assetSearchType(asset)}+is%3Aopen+sort%3Aupdated-desc`,
      example: 'johndoe/repo pr|i|issue',
      desc: "Go to a repo's Github issues or pull requests.",
    },
    {
      template: REPO,
      toUrl: ({ repo }) => `https://github.com/${repo}`,
      example: 'johndoe/repo',
      desc: 'Go to a Github repository.',
    },
  ]);

const basic = () =>
  ghNamespace([
    {
      // Empty template plus `gh` namespace matches bare `gh`.
      template: '',
      toUrl: () => `https://github.com`,
      desc: 'Go to Github.',
    },
  ]);

const all = (params: AppParams['github']): CommandDefinition[] => {
  let definitions: CommandDefinition[] = [];

  if (params?.repo) {
    definitions = [...definitions, ...repoCommands(params?.repo)];
  }

  if (params?.person) {
    definitions = [...definitions, ...me(params?.person)];
  }

  return [...definitions, ...standard(), ...personCommands(), ...basic()];
};

export const github = {
  all,
  standard,
  person: personCommands,
  repo: repoCommands,
  me,
  basic,
};
