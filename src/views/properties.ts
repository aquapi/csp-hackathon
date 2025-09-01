export const src = (url: string) => ' src=' + JSON.stringify(url);
export const classes = (...names: string[]) => ' class=' + JSON.stringify(names.filter(x => x).join(' '));
export const href = (url: string) => ' href=' + JSON.stringify(url);
export const rel = (type: string) => ' rel=' + JSON.stringify(type);
export const type = (type: string) => ' type=' + JSON.stringify(type);
export const id = (id: string) => ' id=' + JSON.stringify(id);
export const name = (name: string) => ' name=' + JSON.stringify(name);
export const placeholder = (name: string) => ' placeholder=' + JSON.stringify(name);
export const style = (styles: string) => ' style=' + JSON.stringify(styles);
