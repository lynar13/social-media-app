
// Import the Noroff API class
import { NoroffAPI } from '../api/index.js';

const apiInstance = new NoroffAPI();

export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case '/auth/login/index.html':
      await import('../ui/auth/login.js');
      break;
    case '/auth/register/index.html':
      await import('../ui/auth/register.js');
      break;
    case '/post/create/index.html':
      await import('../ui/post/create.js');
      break;
    case '/post/edit/index.html':
      await import('../ui/post/edit.js');
      break;
    case '/post/index.html':
      await import('../ui/post/view.js');
      break;
    case '/profile/index.html':
      await import('../ui/profile/profile.js');
      break;
    default:
      await import('../ui/home/home.js'); // Default home page
  }
}

document.addEventListener('DOMContentLoaded', () => {
  router();
});
