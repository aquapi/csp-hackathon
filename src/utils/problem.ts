import * as st from '@safe-std/error';
import config from '../config/index.ts';

export const mark = (problemId: number, testsResult: string[]) => {
  if (problemId >= config.problems.length || problemId < 0)
    return st.err('Invalid problem ID');

  const problem = config.problems[problemId];
  if (testsResult.length !== problem.tests)
    return st.err(`Must provide ${problem.tests} tests`);

  return problem.mark(testsResult);
}
