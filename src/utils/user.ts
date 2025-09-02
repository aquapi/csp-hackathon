import { cookie, hmac, utils } from 'fast-crypt';
import type { Context } from '@mapl/web/core/context';
import config from '../config/index.ts';
import { layer } from '@mapl/web';
import { err } from '@safe-std/error';

const ALGORITHM = 'sha256';

const USERS = config.users;
export const isValid = (name: string, pwd: string) => {
  let res = false;
  for (let i = 0; i < USERS.length; i++)
    res ||= USERS[i].name === name && USERS[i].password === pwd;
  return res;
}

export const signToken = (c: Context, name: string) => {
  c.headers.push([
    'set-cookie',
    cookie.pair(
      'token',
      hmac.sign(ALGORITHM, config.secret, name)
    ) + cookie.httpOnly + cookie.maxAge(60 * 60 * 24)
  ]);
}

export const invalidTokenErr = err(Symbol());
export const verifyToken = layer.parse('username', (c) => {
  const header = c.req.headers.get('cookie');
  if (header !== null) {
    const token = /(?:$| )token=([^;]+)/.exec(header);
    if (token !== null && hmac.verify(ALGORITHM, config.secret, token[1]))
      return token[1];
  }
  return invalidTokenErr;
});

export const clearToken = (c: Context) => {
  c.headers.push(['set-cookie', cookie.pair('token', '') + cookie.maxAge(1)]);
}
