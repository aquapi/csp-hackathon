import { daisy, el, prop, custom } from '@views';
import config from '@config';
import { timeElapsed, TOTAL_TIME } from '../utils/time.ts';

const THEMES = ['dim', 'nord', 'dracula', 'autumn', 'winter'];

export const Page = (
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
      body {
        padding: 0;
        margin: 0;
      }
      * {
        font-family: 'Geist Mono Variable', monospace;
      }
      :root {
        ${custom.defineCSSVars}
      }
    </style>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    ${daisy.load(5) + daisy.themes + head}
  </head>
  <body style='width: 100vw'>${body}</body>
</html>`;

export const Title = (name: string) => el.title(name + ' | ' + config.title);

export const ThemeController = el.select(
  prop.classes('select') +
  prop.style(`max-width: 6rem; margin-right: 1rem; outline: none; border: 0; box-shadow: ${custom.vars.shadow_2xl}`),

  el.option(prop.disabled + prop.selected + prop.value(''), 'Theme') +
  THEMES.map((theme) => el.option(prop.value(theme), theme)).join('') +
  el.script('', `
    const select = document.currentScript.parentElement;
    const initial = document.body.dataset.theme = localStorage.getItem('theme') || '${THEMES[0]}';
    if (initial) select.value = initial;
    select.onchange = function (e) {
      localStorage.setItem('theme', document.body.dataset.theme = this.value);
    }
  `)
);

export const UserNav = (name: string) => daisy.nav(
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

  el.span(prop.style('margin-right: 1rem'), name) +
  ThemeController +
  el.a(
    prop.classes('btn btn-neutral') +
    prop.href('/sign/out'),
    'Sign out'
  )
);

export const TimeRemaining = () => {
  const currentTime = timeElapsed();
  return el.div(prop.classes('hero'),
    el.div(
      prop.classes('hero-content') +
      prop.style('text-align: center; flex-direction: column; padding: 4rem; width: 100vw'),

      el.h1(prop.style('font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem'),
        'Time remaining: ' +
        el.span(prop.id('timeRemainingNumber'), '')
      ) +
      el.progress(
        prop.id('timeRemainingProgress') +
        prop.classes('progress') +
        prop.value(currentTime) +
        prop.max(TOTAL_TIME) +
        prop.style('width: calc(100vw - 12rem)'),
        ''
      ) +
      el.script(prop.type('module'), `
        const timeNum = (num) => num < 10 ? '0' + num : num;
        const renderTime = (dateNumber) => {
          dateNumber = Math.floor(dateNumber / 1000);

          let hour = Math.floor(dateNumber / 3600);
          dateNumber -= hour * 3600;

          let min = Math.floor(dateNumber / 60);
          dateNumber -= min * 60;

          return timeNum(hour) + ':' + timeNum(min) + ':' + timeNum(dateNumber);
        }

        let value = ${currentTime};
        let prevTime = performance.now(), currentTime;

        const loopId = setInterval(render, 1000);
        function render() {
          currentTime = performance.now();
          value += currentTime - prevTime;
          prevTime = currentTime;

          if (${TOTAL_TIME} < value) {
            timeRemainingNumber.textContent = '00:00:00';
            return clearInterval(loopId);
          }

          timeRemainingProgress.value = Math.floor(value);
          timeRemainingNumber.textContent = renderTime(Math.floor(${TOTAL_TIME} - value));
        };
        render();
      `)
    )
  );
}
