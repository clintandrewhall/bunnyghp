import { build } from 'esbuild';

const source = `
  import assert from 'node:assert/strict';
  import { createRegistry } from './src/commands';
  import { getDefinitions } from './src/config';

  const registry = createRegistry(
    getDefinitions({
      search: true,
      github: {
        person: 'clintandrewhall',
        repo: 'clintandrewhall/bunnyghp',
      },
    }),
  );

  const cases = [
    ['i', 'https://github.com/issues?q=is%3Aissue+is%3Aopen+author%3Aclintandrewhall+archived%3Afalse+sort%3Aupdated-desc'],
    ['gh i', 'https://github.com/issues?q=is%3Aissue+is%3Aopen+author%3Aclintandrewhall+archived%3Afalse+sort%3Aupdated-desc'],
    ['i flaky', 'https://github.com/issues?q=is%3Aissue+is%3Aopen+author%3Aclintandrewhall+archived%3Afalse+sort%3Aupdated-desc+flaky'],
    ['gh i flaky', 'https://github.com/issues?q=is%3Aissue+is%3Aopen+author%3Aclintandrewhall+archived%3Afalse+sort%3Aupdated-desc+flaky'],
    ['pr', 'https://github.com/pulls'],
    ['gh pr', 'https://github.com/pulls'],
    ['pr flaky', 'https://github.com/pulls?q=is%3Apr+is%3Aopen+author%3Aclintandrewhall+archived%3Afalse+sort%3Aupdated-desc+flaky'],
    ['gh pr flaky', 'https://github.com/pulls?q=is%3Apr+is%3Aopen+author%3Aclintandrewhall+archived%3Afalse+sort%3Aupdated-desc+flaky'],
    ['gh i 123', 'https://github.com/clintandrewhall/bunnyghp/issues/123'],
    ['gh pr 123', 'https://github.com/clintandrewhall/bunnyghp/pull/123'],
    ['gh r pr', 'https://github.com/clintandrewhall/bunnyghp/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-desc'],
    ['gh r i', 'https://github.com/clintandrewhall/bunnyghp/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc'],
    ['gh some-org', 'https://github.com/some-org'],
  ];

  for (const [query, url] of cases) {
    assert.equal(registry.toUrl(query), url, query);
  }

  assert.equal(registry.toUrl('me'), false);
  assert.equal(registry.toUrl('p'), false);
  assert.equal(registry.toUrl('gh some_org'), false);

  const noPersonRegistry = createRegistry(
    getDefinitions({
      search: true,
      github: {
        repo: 'clintandrewhall/bunnyghp',
      },
    }),
  );

  assert.equal(noPersonRegistry.toUrl('pr'), false);
  assert.equal(noPersonRegistry.toUrl('i'), false);

  const examples = registry.commands.map(({ example }) => example);
  assert.ok(
    examples.indexOf('pr, pr test fix') < examples.indexOf('gh pr, gh pr test fix'),
    'root PR shortcut should be listed before gh PR shortcut',
  );
`;

const result = await build({
  stdin: {
    contents: source,
    resolveDir: process.cwd(),
    sourcefile: 'command-contracts.ts',
    loader: 'ts',
  },
  bundle: true,
  define: {
    'import.meta.env.BASE_URL': '"/"',
  },
  format: 'esm',
  platform: 'node',
  write: false,
});

// Bundle TS sources in memory so tests run without generated files or Vitest.
const bundled = Buffer.from(result.outputFiles[0].text).toString('base64');
await import(`data:text/javascript;base64,${bundled}`);

console.log('Command registry tests passed.');
