import { AppParams, CommandDefinition, CommandFn } from '../types';
import { NUMBER, PERSON, REPO } from '.';

const ASSET = `:asset(pr|issue|i)`;

const pri = (type: string, plural = false) => {
  switch (type) {
    case 'pr':
      return 'pull';
    case 'issue':
    case 'i':
      return plural ? 'issues' : 'issue';
    default:
      return '';
  }
};

const personCommands: CommandFn = () => [
  {
    template: `gh ${PERSON}`,
    toUrl: ({ person }) => `https://github.com/${person}`,
    example: 'gh johndoe',
    desc: "Go to a person's Github profile.",
  },
];

const me: CommandFn = (person) => [
  {
    template: `gh me`,
    toUrl: () => `https://github.com/${person}`,
    desc: 'Go to your Github profile.',
  },
  {
    template: `gh i`,
    toUrl: () =>
      `https://github.com/issues?q=is%3Aissue+is%3Aopen+author%3A${person}+archived%3Afalse+sort%3Aupdated-desc`,
    desc: 'Go to your open issues.',
  },
  {
    template: `gh pr`,
    toUrl: () =>
      `https://github.com/pulls?q=is%3Apr+is%3Aopen+author%3A${person}+archived%3Afalse+sort%3Aupdated-desc`,
    desc: 'Go to your open pull requests.',
  },
];

const repoCommands: CommandFn = (repo) => [
  {
    template: `gh ${ASSET} ${NUMBER}`,
    toUrl: ({ asset, number }) =>
      `https://github.com/${repo}/${pri(asset)}/${number}`,
    example: 'gh pr|i|issue 123',
    desc: `Go to an issue or pull request for ${repo} by number.`,
  },
  {
    template: `gh ${NUMBER}`, // GH will resolve if item is a pull
    toUrl: ({ number }) => `https://github.com/${repo}/issues/${number}`,
    example: 'gh 123',
    desc: `Go to an issue or pull request for ${repo} by number.`,
  },
  {
    template: `gh r ${ASSET}`,
    toUrl: ({ asset }) =>
      `https://github.com/${repo}/${pri(asset, true)}?q=is%3A${pri(
        asset,
      )}+is%3Aopen+sort%3Aupdated-desc`,
    example: 'gh r pr|i|issue',
    desc: `Go to open issues or pull requests for ${repo}.`,
  },
  {
    template: `gh r ${NUMBER}`, // GH will resolve if item is a pull
    toUrl: ({ number }) => `https://github.com/${repo}/issues/${number}`,
    example: 'gh r 123',
    desc: `Go to open issues or pull requests for ${repo} by number.`,
  },
  {
    template: `gh r`,
    toUrl: () => `https://github.com/${repo}`,
    desc: `Go to ${repo}.`,
  },
];

const standard: CommandFn = () => [
  {
    template: `gh ${REPO} ${ASSET} ${NUMBER}`,
    toUrl: ({ repo, asset, number }) =>
      `https://github.com/${repo}/${pri(asset, true)}/${number}`,
    example: 'gh johndoe/repo pr|i|issue 123',
    desc: "Go to a repo's Github issue or pull request by number.",
  },
  {
    template: `gh ${REPO} ${NUMBER}`, // GH will resolve if item is a pull
    toUrl: ({ repo, number }) => `https://github.com/${repo}/issues/${number}`,
    example: 'gh johndoe/repo 123',
    desc: "Go to a repo's Github issue or pull request by number.",
  },
  {
    template: `gh ${REPO} ${ASSET}`,
    toUrl: ({ repo, asset }) =>
      `https://github.com/${repo}/${pri(asset, true)}?q=is%3A${pri(
        asset,
      )}+is%3Aopen+sort%3Aupdated-desc`,
    example: 'gh johndoe/repo pr|i|issue',
    desc: "Go to a repo's Github issues or pull requests.",
  },
  {
    template: `gh ${REPO}`, // GH will resolve if item is a pull
    toUrl: ({ repo }) => `https://github.com/${repo}`,
    example: 'gh johndoe/repo',
    desc: 'Go to a Github repository.',
  },
];

const basic = () => [
  {
    template: `gh`,
    toUrl: () => `https://github.com`,
    desc: 'Go to Github.',
  },
];

const all = (params: AppParams['github']): CommandDefinition[] => {
  let definitions = [...standard(), ...personCommands()];

  if (params?.repo) {
    definitions = [...repoCommands(params?.repo), ...definitions];
  }

  if (params?.person) {
    definitions = [...me(params?.person), ...definitions];
  }

  return [...definitions, ...basic()];
};

export const github = {
  all,
  standard,
  person: personCommands,
  repo: repoCommands,
  me,
  basic,
};
