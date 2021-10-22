import { github, google, help, createRegistry, classic } from './commands';
import { Home } from './components';

const useLocation = () => ({
  path: location.pathname,
  query: new URLSearchParams(window.location?.search).get('q') || '',
});

// hackity hackity
const definitions = [
  ...help(),
  ...google(),
  ...github.all({
    // TODO: also allow for local storage
    defaultPerson: process.env.REACT_APP_GITHUB_DEFAULT_PERSON,
    defaultRepo: process.env.REACT_APP_GITHUB_DEFAULT_REPO,
  }),
  ...classic(),
];

const registry = createRegistry(definitions);

export const App = () => {
  const { path, query } = useLocation();

  // All of this feels clunky, but it works for now.
  if (path === '/' && query) {
    window.location.replace(registry.toUrl(query) || '/');
    return null;
  }

  // Feels clunky, but it works.
  if (path.startsWith('/home') || path === '/') {
    return <Home {...{ registry, query }} />;
  }

  window.location.replace('/');
  return null;
};
