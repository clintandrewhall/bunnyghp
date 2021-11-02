/**
 * You can edit this file to add and remove sets of commands.
 */

import { github, google, help, classic } from './commands';

// Importing separately until fork is deployed.
import { kibana } from './commands/kibana';

// Add or remove commands here.
export const definitions = [
  ...help(),
  ...kibana(process.env.REACT_APP_GITHUB_DEFAULT_PERSON), // TODO: remove this when fork is deployed.
  ...github.all({
    // TODO: also allow for local storage
    defaultPerson: process.env.REACT_APP_GITHUB_DEFAULT_PERSON,
    defaultRepo: process.env.REACT_APP_GITHUB_DEFAULT_REPO,
  }),
  ...google(),
  ...classic(),
];
