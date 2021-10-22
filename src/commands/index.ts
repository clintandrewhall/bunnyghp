import { match as templateMatch } from 'path-to-regexp';
import { CommandRegistry, CommandDefinition } from '../types';

export { github } from './github';
export { google } from './google';
export { help } from './help';
export { classic } from './classic';

const options = {
  delimiter: ' ?',
};

export const OPTIONAL_SPACE = '( |$)';
export const QUERY = `${OPTIONAL_SPACE}:query(.+)?`;

export const createRegistry = (
  definitions: CommandDefinition[],
): CommandRegistry => {
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
