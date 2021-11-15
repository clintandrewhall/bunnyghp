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
export const PERSON = `:person([a-zA-Z0-9_]+)`;
export const REPO = `:repo(\\w+\/\\w+)`;
export const NUMBER = `:number(\\d+)`;

export const sortCommandDefinitions = (
  a: CommandDefinition,
  b: CommandDefinition,
) =>
  (a.example || a.template).split(',')[0] <
  (b.example || b.template).split(',')[0]
    ? -1
    : 1;

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
