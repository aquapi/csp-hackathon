import { handle, router } from '@mapl/web';
import { verifyToken } from '../utils/user.ts';

import { el } from '@views';
import { navbar, page } from '@layouts';

export default router(
  [verifyToken],
  [
    handle.get(
      '/',
      (c) => page(
        el.title('Contest'),
        navbar
      ),
      handle.html
    )
  ]
);
