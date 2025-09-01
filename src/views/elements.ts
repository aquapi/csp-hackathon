export const title = (str: string) => `<title>${str}</title>`;
export const description = (str: string) => `<meta name='description' content=${JSON.stringify(str)}>`;
export const style = (prop: string, content: string) => `<style${prop}>${content}</style>`;

export const form = (prop: string, content: string) => `<form${prop}>${content}</form>`;
export const label = (prop: string, content: string) => `<label${prop}>${content}</label>`;
export const input = (prop: string) => `<input${prop}>`;
export const script = (prop: string, content: string) => `<script${prop}>${content}</script>`;
export const link = (prop: string) => `<link${prop}>`;
export const span = (prop: string, content: string) => `<span${prop}>${content}</span>`;
export const div = (prop: string, content: string) => `<div${prop}>${content}</div>`;
export const fieldset = (prop: string, content: string) => `<fieldset${prop}>${content}</fieldset>`;
export const legend = (prop: string, content: string) => `<legend${prop}>${content}</legend>`;
export const h1 = (prop: string, content: string) => `<h1${prop}>${content}</h1>`;
export const button = (prop: string,content: string) => `<button${prop}>${content}</button>`
export const br = '<br>';
