import { handle, router } from '@mapl/web';
import { UserNav, Page, Title, TimeRemaining } from '@layouts';
import { verifyToken } from '../utils/user.ts';

export default router(
  [verifyToken],
  [
    handle.get(
      '/',
      (c) => Page(
        Title('Contest'),

        UserNav(c.username) +
        TimeRemaining()
      ),
      handle.html
    )
  ]
);
