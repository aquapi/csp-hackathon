import { href, rel, type } from './properties.ts';
import { link } from './elements.ts';

export const css = (url: string) => link(rel('stylesheet') + type('text/css') + href(url));
