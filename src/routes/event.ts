import { handle, router } from '@mapl/web';
import { sse } from 'live-sse';

export const channel = sse.channel();

const handler = sse.stream(channel);
export default router([], [
  handle.get('/', (c) => handler(c.req))
]);
