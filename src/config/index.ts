export type TimeString = `${number}:${number}:${number} ${number}/${number}/${number}`;
export interface Problem {
  name: string;
  tests: number;
  mark: (arr: string[]) => number;
}
export interface User {
  name: string;
  password: string;
}

export const problem = (problem: Problem) => problem;

// Parse config
const defineConfig = (config: {
  timeLimit: {
    start: TimeString,
    freeze: TimeString,
    end: TimeString
  },
  problems: Problem[],
  users: User[],
  secret: string
}) => config;

const loadProblemList = async (): Promise<Problem[]> =>
  Promise.all(
    [...new Bun.Glob('**/*.{js,ts,jsx,tsx,cjs,mjs,mts,cts}').scanSync({
      cwd: import.meta.dir + '/problems',
      absolute: true
    })].map(async (path) => (await import(path)).default)
  );

export default defineConfig({
  // Format: hour:minute:second date/month/year
  timeLimit: {
    start: '10:20:0 1/9/2025',
    freeze: '10:21:0 1/9/2025',
    end: '10:22:0 1/9/2025'
  },

  // Problem list (read from './problems')
  problems: await loadProblemList(),

  // Contest user list
  users: [
    {
      name: 'revenode',
      password: '12345678'
    },
    {
      name: 'dragonmonst',
      password: '12345678'
    }
  ],

  // Change to another value when starting the contest
  secret: '2nng9a278bn'
});
