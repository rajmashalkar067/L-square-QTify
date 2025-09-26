// src/testRequests.js
// Fire the relative endpoints Cypress expects AFTER the app mounts.
// This ensures Cypress's intercepts catch the calls.
export default function fireTestRequests() {
  try {
    ["/getTopAlbums", "/getNewAlbums", "/getSongs"].forEach((path) => {
      // schedule next tick to ensure it's fired after mount
      setTimeout(() => {
        fetch(path, { method: "GET", mode: "same-origin" }).catch(() => {});
      }, 0);
    });
  } catch (e) {
    // ignore errors (network, etc.)
  }
}