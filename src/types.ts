import { MatchFunction } from 'path-to-regexp';

export interface CommandDefinition {
  template: string;
  toUrl: (params: Record<string, string>) => string;
  desc: string;
  example?: string;
}

export interface Command {
  match: MatchFunction;
  toUrl: URLFn;
  desc: string;
  example: string;
}

export interface CommandRegistry {
  commands: Command[];
  toUrl: URLFn;
}

export type CommandFn = (...params: string[]) => CommandDefinition[];
export type URLFn = (query: string) => string | false;

export interface AppParams {
  search: boolean;
  github?: {
    person?: string;
    repo?: string;
  };
}
