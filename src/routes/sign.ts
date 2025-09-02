/**
 * @module
 * Handle signin
 */

import { handle, router } from '@mapl/web';

import { clearToken, isValid, signToken } from '../utils/user.ts';

import { daisy, el, prop } from '@views';
import { Page, ThemeController } from '@layouts';
import config from '@config';

const signin = Page(
  el.title('Sign in'),

  daisy.nav(
    '',
    el.a(
      prop.style('font-weight: bold; margin-right: 2rem') +
      prop.href('/'),
      config.title
    ) + ThemeController,
    ''
  ) +
  // Toast for alerts (`toasts.signin`)
  daisy.toast('signin', 1) +
  el.div(
    prop.classes('hero') +
    prop.style('margin-top: 10rem'),
    el.div(
      prop.classes('hero-content') +
      prop.style('text-align: center'),
      // Main form
      el.form(prop.id('formSignin'),
        el.fieldset(
          prop.classes('fieldset') +
          prop.style('gap: 0.8rem; font-size: 0.8rem'),
          el.legend(
            prop.classes('fieldset-legend') +
            prop.style('font-size: 1.8rem'),
            'Sign in'
          ) +
          el.div(prop.style('text-align: left'),
            daisy.label('Username') +
            daisy.input(
              prop.id('inputName') +
              prop.placeholder('Username')
            )
          ) +
          el.div(prop.style('text-align: left'),
            daisy.label('Password') +
            daisy.input(
              prop.id('inputPwd') +
              prop.type('password') +
              prop.placeholder('Password')
            )
          ) +

          daisy.primaryButton('', 'Let me in!') +
          el.script('', `
            formSignin.onsubmit = async (e) => {
              e.preventDefault();

              if (inputName.value.includes(':'))
                return toasts.signin('error', 'Username cannot include character ":"!');

              try {
                const res = await fetch('./in', {
                  method: 'POST',
                  body: inputName.value + ':' + inputPwd.value,
                });
                if (res.status === 200) {
                  toasts.signin('success', 'Sign in successfully! Redirecting...');
                  setTimeout(() => location.href = '/', 1500);
                } else if (res.status >= 400 && res.status < 500) {
                  toasts.signin('error', 'Invalid username or password!');
                } else {
                  toasts.signin('error', 'Unknown error!');
                  console.error(res);
                }
              } catch (e) {
                toasts.signin('error', 'Unknown error!');
                console.error(e);
              }
            }
          `)
        )
      )
    )
  )
);

export default router(
  [],
  [
    handle.get('/in', () => signin, handle.html),
    handle.post('/in', async (c) => {
      const pair = (await c.req.text()).split(':', 2);

      if (pair.length < 2 || !isValid(pair[0], pair[1])) {
        c.status = 400;
        return;
      }

      signToken(c, pair[0]);
    }),
    handle.get('/out', (c) => {
      clearToken(c);
      c.status = 307;
      c.headers.push(['location', './in']);
    })
  ]
);
