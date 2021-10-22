import { ROOT, HELP } from './constants';
import { createRegistry } from './commands';
import { definitions } from './config';
import { Home } from './components';

const useLocation = () => ({
  path: location.pathname,
  query: new URLSearchParams(window.location?.search).get('q') || '',
});

const registry = createRegistry(definitions);

export const App = () => {
  const { path, query } = useLocation();

  // All of this feels clunky, but it works for now.
  if (path === ROOT && query) {
    window.location.replace(registry.toUrl(query) || '/');
    return null;
  }

  // Feels clunky, but it works.
  if (path.startsWith(HELP) || path === ROOT) {
    return <Home {...{ registry, query }} />;
  }

  window.location.replace(ROOT);
  return null;
};
