import { problem } from '../index.ts';

const ANS = [3, 4, 6, 33, 20, 13, 18];
const SCORES = [10, 10, 10, 15, 15, 20, 20];

export default problem({
  name: 'Con bac bat bai',
  tests: SCORES.length,
  mark: (arr) => {
    let res = 0;
    for (let i = 0; i < SCORES.length; i++)
      if (ANS[i] === +arr[i])
        res += SCORES[i];
    return res;
  }
});
