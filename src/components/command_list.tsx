import { Fragment } from 'react';
import { Command } from '../types';

interface Props {
  commands: Command[];
}

export const CommandList = ({ commands }: Props) => {
  return (
    <dl>
      {commands.map((item, key) => (
        <Fragment key={'f' + key}>
          <dt key={`dt-${key}`}>
            <code>{item.example}</code>
          </dt>
          <dd key={`dd-${key}`}>{item.desc}</dd>
        </Fragment>
      ))}
    </dl>
  );
};
