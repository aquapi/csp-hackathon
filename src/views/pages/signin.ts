import { daisy, el, layout, prop } from '../views/index.ts';

const signin = layout.page(
  el.title('Sign in'),

  el.div(
    prop.classes('hero') + prop.style('min-height: 100vh'),

    el.div(
      prop.classes('hero-content') + prop.style('text-align: center;'),

      el.fieldset(
        prop.classes('fieldset') + prop.style('gap: 0.8rem; font-size: 0.8rem'),

        el.legend(
          prop.classes('fieldset-legend') + prop.style('font-size: 1.8rem'),
          'Sign in'
        ) +
        el.div(
          prop.style('text-align: left'),
          daisy.label('Username') +
          daisy.input(prop.id('name') + prop.placeholder('Username'))
        ) +
        el.div(
          prop.style('text-align: left'),
          daisy.label('Password') +
          daisy.input(prop.id('pwd') + prop.type('password') + prop.placeholder('Password'))
        ) +
        daisy.primaryButton('Let me in!')
      )
    )
  )
);
