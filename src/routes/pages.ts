import { handle, router } from '@mapl/web';
import { UserNav, Page, Title, TimeRemaining } from '@layouts';
import { invalidTokenErr, verifyToken } from '../utils/user.ts';

const pages = router(
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

export default handle.error(pages, (err, c) => {
  if (err === invalidTokenErr) {
    c.status = 302;
    c.headers.push(['location', '/sign/in']);
  } else {
    c.status = 400;
    console.log(err);
  }
});
