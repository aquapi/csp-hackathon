import { href, rel, type } from './properties.ts';
import { link } from './elements.ts';

export const css = (url: string) => link(rel('stylesheet') + type('text/css') + href(url));

const cssVars = {
  shadow_2xl: '0 25px 50px -12px rgb(0 0 0 / 0.25)'
};
export const defineCSSVars = Object.entries(cssVars).map(([k, v]) => `--${k}:${v};`).join('');
export const vars: {
  [K in keyof typeof cssVars]: `var(--${K})`
} = Object.fromEntries(
  Object.entries(cssVars).map(([k, v]) => [k, `var(--${k})`])
) as any;
