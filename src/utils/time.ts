import type { TimeString } from '../config/index.ts';
import config from '../config/index.ts';

const parseTime = (time: TimeString) => {
  const parts = time.split(' ', 2);
  const daytime = parts[0].split(':', 3).map((x) => +x);
  const date = parts[1].split('/', 3).map((x) => +x);

  return new Date(date[2], date[1] - 1, date[0], ...daytime).getTime();
}

export const START_TIME = parseTime(config.timeLimit.start);
export const FREEZE_TIME = parseTime(config.timeLimit.freeze);
export const END_TIME = parseTime(config.timeLimit.end);
export const TOTAL_TIME = END_TIME - START_TIME;
export const timeElapsed = () => Math.min(Date.now() - START_TIME, TOTAL_TIME);
