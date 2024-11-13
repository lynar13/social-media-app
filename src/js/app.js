import router from "/social-media-app/src/js/router/index.js"; 

// Wrap the router call in an async function
async function initRouter() {
  await router(window.location.pathname);
}

initRouter();
