import { handle, router } from '@mapl/web';
import { daisy, el, layout, prop } from '../views/index.ts';
import { isValid, signToken } from '../utils/user.ts';

const signin = layout.page(
  el.title('Sign in'),

  // Toast for alerts (`toasts.signin`)
  daisy.toast('signin', 1) +
  el.div(
    prop.classes('hero') +
    prop.style('min-height: 100vh'),

    el.div(
      prop.classes('hero-content') +
      prop.style('text-align: center'),

      // Main form
      el.fieldset(
        prop.classes('fieldset') +
        prop.style('gap: 0.8rem; font-size: 0.8rem'),

        el.legend(
          prop.classes('fieldset-legend') +
          prop.style('font-size: 1.8rem'),
          'Sign in'
        ) +
        el.div(
          prop.style('text-align: left'),

          daisy.label('Username') +
          daisy.input(
            prop.id('inputName') +
            prop.placeholder('Username')
          )
        ) +
        el.div(
          prop.style('text-align: left'),

          daisy.label('Password') +
          daisy.input(
            prop.id('inputPwd') +
            prop.type('password') +
            prop.placeholder('Password')
          )
        ) +

        daisy.primaryButton(
          prop.id('submit'),
          'Let me in!'
        ) +
        el.script('', `
          submit.onmousedown = async () => {
            if (inputName.value.includes(':'))
              return toasts.signin('error', 'Username cannot include character ":"!');

            try {
              const res = await fetch('/signin', {
                method: 'POST',
                body: inputName.value + ':' + inputPwd.value,
              });
              if (res.ok) {
                toasts.signin('success', 'Sign in successfully! Redirecting...');
                setTimeout(() => location.href = '/', 1500);
              } else if (res.status >= 400 && res.status < 500) {
                toasts.signin('error', 'Invalid username or password!');
              } else {
                toasts.signin('error', 'Internal server error!');
                console.error(res);
              }
            } catch (e) {
              toasts.signin('error', 'Internal server error!');
              console.error(e);
            }
          }
        `)
      )
    )
  )
);

export default router(
  [],
  [
    handle.get('/', () => signin, handle.html),
    handle.post('/', async (c) => {
      const pair = (await c.req.text()).split(':', 2);

      if (pair.length < 2 || !isValid(pair[0], pair[1])) {
        c.status = 400;
        console.log('Invalid', pair);
        return;
      }

      signToken(c, pair[0]);
    })
  ]
);
