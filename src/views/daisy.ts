import { prop, el, custom } from './index.ts';

export const load = (version: string | number, ...parts: string[]) =>
  custom.css(
    parts.length === 0
      ? 'https://cdn.jsdelivr.net/npm/daisyui@' + version
      : 'https://cdn.jsdelivr.net/combine/' + parts.map((part) => `npm/daisyui@${version}/${part}.css`).join()
  );

export const themes = custom.css('https://cdn.jsdelivr.net/npm/daisyui@5/themes.css');

export const primaryButton = (props: string, content: string) => el.button(
  prop.classes('btn btn-primary') + props, content
);
export const label = (content: string) => el.label(
  prop.classes('label'), content
);
export const input = (props: string) => el.input(prop.classes('input') + prop.style('outline: none') + props);

export const toast = (id: string, size: number) => el.div(
  prop.classes('toast toast-center toast-top') + prop.id(id),
  el.script('', `
    const removeChild = () => {
      const firstChild = ${id}.firstElementChild;
      if (firstChild != null)
        ${id}.removeChild(firstChild);
    };
    setInterval(removeChild, 5000);
    (globalThis.toasts ||= {}).${id} ||= (alertType, message) => {
      ${id}.insertAdjacentHTML('beforeend', \`<div class="alert alert-\${alertType}">\${message}</div>\`);
      if (${id}.children.length > ${size}) removeChild();
    }
  `)
);
