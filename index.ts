import { compile } from '@mapl/web';
import routes from './src/routes/index.ts';

Bun.serve({
  fetch: compile(routes)
});
