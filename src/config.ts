/**
 * You can edit this file to add and remove sets of commands.
 */

import { github, google, help, classic } from './commands';

// Importing separately until fork is deployed.
import { kibana } from './commands/kibana';
import { AppParams } from './types';

// Add or remove commands here.
export const getDefinitions = (params?: AppParams) => [
  ...help(),
  ...kibana(params?.github?.person), // TODO: remove this when fork is deployed.
  ...github.all(params?.github),
  ...google(),
  ...classic(),
];
