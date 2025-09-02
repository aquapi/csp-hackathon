import { daisy, el, prop } from '@views';
import config from '@config';

const THEME = 'dim';

export const page = (
  head: string,
  body: string
) => `<html lang='en'>
  <head>
    <meta charset='utf-8'>
    <style>
      /* geist-mono-latin-wght-normal */
      @font-face {
        font-family: 'Geist Mono Variable';
        font-style: normal;
        font-display: swap;
        font-weight: 100 900;
        src: url(https://cdn.jsdelivr.net/fontsource/fonts/geist-mono:vf@latest/latin-wght-normal.woff2) format('woff2-variations');
        unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
      }
      * {
        font-family: 'Geist Mono Variable', monospace;
      }
    </style>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    ${daisy.load(5) + daisy.themes + head}
  </head>
  <body style='width: 100vw' data-theme='${THEME}'>${body}</body>
</html>`;

export const title = (name: string) => el.title(name + ' | ' + config.title);

export const navbar = daisy.nav(
  el.a(
    prop.style('font-weight: bold') +
    prop.href('/'),
    config.title
  ),

  el.ul(prop.classes('menu menu-horizontal'),
    el.li('',
      el.a(prop.href('/submit'), 'Submit')
    ) +
    el.li('',
      el.a(prop.href('/ranking'), 'Ranking')
    )
  ),

  el.a(
    prop.classes('btn btn-neutral') +
    prop.href('/sign/out'),
    'Sign out'
  )
)
