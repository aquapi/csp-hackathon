import { compile } from '@mapl/web';
import routes from './src/routes/index.ts';

Bun.serve({
  fetch: compile(routes),
  error: (e) => {
    console.error(e);
    return new Response(null, { status: 500 });
  }
});
