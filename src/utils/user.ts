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

export const unauthenticatedErr = err('unauthenticated');
export const verifyToken = layer.parse('token', (c) =>  {
  const header = c.req.headers.get('cookie');
  if (header != null && header.startsWith('token')) {
    const value = header.slice(5);
    if (hmac.verify(ALGORITHM, config.secret, value))
      return value;
  }
  return unauthenticatedErr;
})
