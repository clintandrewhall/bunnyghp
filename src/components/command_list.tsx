import { Command } from '../types';

interface Props {
  commands: Command[];
}

export const CommandList = ({ commands }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Command</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {commands.map((item, key) => (
          <tr key={'f' + key}>
            <td key={`dt-${key}`}>
              <code>{item.example}</code>
            </td>
            <td key={`dd-${key}`}>{item.desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
