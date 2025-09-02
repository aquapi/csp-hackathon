import { router } from '@mapl/web';
import sign from './sign.ts';
import pages from './pages.ts';
import event from './event.ts';

export default router([], [], {
  '/sign': sign,
  '/event': event,
  '/': pages
});
