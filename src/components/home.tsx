import { CommandList } from '.';
import { CommandRegistry } from '../types';
import { InputForm } from './input_form';

interface Props {
  query: string;
  registry: CommandRegistry;
}

export const Home = ({ registry, query }: Props) => {
  return (
    <div>
      <div className="App">
        <InputForm {...{ registry, query }} />
        <CommandList commands={registry.commands} />
      </div>
    </div>
  );
};
