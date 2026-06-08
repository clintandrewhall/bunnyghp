import { match as templateMatch } from 'path-to-regexp';
import { CommandRegistry, CommandDefinition } from '../types';
import { help } from './help';

export { github } from './github';
export { google } from './google';
export { classic } from './classic';

const options = {
  delimiter: ' ?',
};

export const OPTIONAL_SPACE = '( |$)';
export const QUERY = `${OPTIONAL_SPACE}:query(.+)?`;
export const PERSON = `:person([a-zA-Z0-9][a-zA-Z0-9-]*)`;
export const REPO = `:repo(\\w+\/\\w+)`;
export const NUMBER = `:number(\\d+)`;

const withNamespace = (prefix: string, value: string) => {
  const parts = [prefix.trim(), value.trim()].filter(Boolean);
  return parts.join(' ');
};

const namespaceExamples = (prefix: string, example: string) =>
  example
    .split(',')
    .map((item) => withNamespace(prefix, item))
    .join(', ');

export const namespace = (
  prefix: string | string[],
  definitions: CommandDefinition[],
): CommandDefinition[] =>
  (Array.isArray(prefix) ? prefix : [prefix]).flatMap((namespacePrefix) =>
    definitions.map((definition) => ({
      ...definition,
      template: withNamespace(namespacePrefix, definition.template),
      example: definition.example
        ? namespaceExamples(namespacePrefix, definition.example)
        : undefined,
    })),
  );

export const createRegistry = (
  definitions: CommandDefinition[],
): CommandRegistry => {
  definitions = [...help(), ...definitions];

  const commands = definitions.map(({ template, toUrl, example, desc }) => {
    const match = templateMatch(template, options);

    return {
      match,
      toUrl: (query: string) => {
        const result = match(query);

        if (result) {
          return toUrl(result.params as Record<string, string>);
        }

        return false;
      },
      example: example || template,
      desc,
    };
  });

  return {
    commands,
    toUrl: (query: string) =>
      commands.find(({ match }) => match(query))?.toUrl(query) || false,
  };
};
