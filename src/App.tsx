import { ROOT, HELP } from './constants';
import { createRegistry } from './commands';
import { definitions } from './config';
import { Home } from './components';

const useLocation = () => {
  const params = new URLSearchParams(window.location?.search);
  const query = params.get('q') || '';
  const search = !!(params.get('s') || false);

  return {
    path: location.pathname.replace(/\//g, ''),
    query,
    search,
  };
};

const registry = createRegistry(definitions);
const root = ROOT.replace(/\//g, '');

export const App = () => {
  const { path, query, search } = useLocation();

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
    if (search) {
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

  window.location.replace(ROOT);
  return null;
};
