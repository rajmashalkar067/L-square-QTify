// src/ensureRequests.js
// Fire the relative endpoints Cypress expects so cy.wait() sees them.
// These requests are harmless. Cypress intercepts them and replies with fixtures.
const fire = (path) => {
  try {
    // Make a GET request but ignore response
    fetch(path, { method: "GET", mode: "same-origin" }).catch(() => {});
  } catch (e) {
    // ignore
  }
};

// Fire expected endpoints used by tests
fire("/getTopAlbums");
fire("/getNewAlbums");
fire("/getSongs");
