import { useMemo } from 'react';

import {
  HELP,
  PARAM_GH_PERSON,
  PARAM_GH_REPO,
  PARAM_QUERY,
  PARAM_SEARCH,
  ROOT,
} from './constants';
import { createRegistry } from './commands';
import { getDefinitions } from './config';
import { Home } from './components';

const useLocation = () => {
  const params = new URLSearchParams(window.location?.search);
  const query = params.get(PARAM_QUERY) || '';
  const search = !!(params.get(PARAM_SEARCH) || false);
  const repo =
    params.get(PARAM_GH_REPO) || process.env.REACT_APP_GITHUB_DEFAULT_REPO;
  const person =
    params.get(PARAM_GH_PERSON) || process.env.REACT_APP_GITHUB_DEFAULT_PERSON;

  return {
    path: location.pathname.replace(/\//g, ''),
    query,
    params: {
      search,
      github: {
        repo,
        person,
      },
    },
  };
};

const useRegistry = () => {
  const { params } = useLocation();

  const registry = useMemo(
    () => createRegistry(getDefinitions(params)),
    [params],
  );

  return registry;
};

const root = ROOT.replace(/\//g, '');

export const App = () => {
  const { path, query, params } = useLocation();
  const registry = useRegistry();

  // All of this feels clunky, but it works for now.
  if (path === root && query) {
    const url = registry.toUrl(query);

    // If we match based on the raw query, we can redirect to the URL.
    if (url) {
      window.location.replace(url);
      return null;
    }

    // If we didn't match, but search by default is enabled, redirect to the
    // google search match with the full query.
    if (params.search) {
      window.location.replace(registry.toUrl(`g ${query}`) || ROOT);
      return null;
    }

    // Otherwise, go home.
    window.location.replace(ROOT);
    return null;
  }

  // Feels clunky, but it works.
  if (path.startsWith(HELP) || path === root) {
    return <Home {...{ registry, query }} />;
  }

  // If we don't match anything, go home.
  window.location.replace(ROOT);
  return null;
};
