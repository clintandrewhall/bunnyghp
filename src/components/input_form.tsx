import { useState } from 'react';
import { ROOT } from '../constants';
import { CommandRegistry } from '../types';

interface Props {
  query: string;
  registry: CommandRegistry;
}

export const InputForm = ({ registry, query }: Props) => {
  const [currentQuery, setCurrentQuery] = useState(query);

  return (
    <div>
      <form action={ROOT} method="GET">
        <input
          type="text"
          name="q"
          value={currentQuery}
          onChange={(e) => setCurrentQuery(e.target.value)}
          autoComplete="off"
        />
        <input type="submit" />
      </form>
      <p>{registry.toUrl(currentQuery) || <br />}</p>
    </div>
  );
};
