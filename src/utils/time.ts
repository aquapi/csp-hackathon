import type { TimeString } from '../config/index.ts';
import config from '../config/index.ts';

const parseTime = (time: TimeString) => {
  const parts = time.split(' ', 2);
  const daytime = parts[0].split(':', 3).map((x) => +x);
  const date = parts[1].split('/', 3).map((x) => +x);

  return new Date(date[2], date[1] - 1, date[0], ...daytime).getTime();
}

export const startTime = parseTime(config.timeLimit.start);
export const freezeTime = parseTime(config.timeLimit.freeze);
export const endTime = parseTime(config.timeLimit.end);
