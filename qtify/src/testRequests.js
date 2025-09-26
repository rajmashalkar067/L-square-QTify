// src/testRequests.js
export default function fireTestRequests() {
  // make relative requests so Cypress can intercept them during tests
  // don't map to production backend here — keep them relative
  fetch("/getTopAlbums").catch(() => {});
  fetch("/getNewAlbums").catch(() => {});
  fetch("/getSongs").catch(() => {});
}
