import { match as templateMatch } from 'path-to-regexp';
import { CommandRegistry, CommandDefinition } from '../types';
import { help } from './help';

export { github } from './github';
export { google } from './google';
export { classic } from './classic';

const options = {
  delimiter: ' ?',
};

export const QUERY = ':query(.+)?';

export const PERSON = `:person([a-zA-Z0-9][a-zA-Z0-9-]*)`;
export const REPO = `:repo(\\w+\/\\w+)`;
export const NUMBER = `:number(\\d+)`;

const withNamespace = (prefix: string, value: string) => {
  const trimmedPrefix = prefix.trim();
  const trimmedValue = value.trim();
  if (!trimmedPrefix) return trimmedValue;
  if (!trimmedValue) return trimmedPrefix;
  return `${trimmedPrefix} ${trimmedValue}`;
};

const namespaceExamples = (prefix: string, example: string) =>
  example
    .split(',')
    .map((item) => withNamespace(prefix, item))
    .join(', ');

// Treat a spaced optional param as an optional segment: `g :query?` matches `g` and `g foo`.
const templateExpression = (template: string) =>
  template.replace(
    / (:[a-zA-Z_][a-zA-Z0-9_]*(?:\([^)]*\))?)\?/g,
    '{ $1}?',
  );

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
    const match = templateMatch(templateExpression(template), options);

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
