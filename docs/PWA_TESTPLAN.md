# PWA installation and offline verification

Run this checklist after changes to `sw.js`, `manifest.json`, the application shell, or cache policy.

## Preparation

1. Pull the current branch and run `npm test`.
2. Start a local server with `python3 -m http.server 8001`.
3. Open `http://localhost:8001/` in a Chromium-based browser.
4. Open Developer Tools and select **Application**.

## Fresh installation

1. Under **Storage**, clear site data and unregister existing service workers.
2. Reload the page.
3. Confirm that `sw.js` is activated and controls the page.
4. Confirm that the manifest is detected without errors.
5. Install the application using the browser installation control or the dashboard install button.
6. Launch the installed application and confirm standalone display.

## Offline behavior

1. Visit the dashboard and IPv4 calculator while online.
2. In Developer Tools, set the network to **Offline**.
3. Reload the installed application.
4. Confirm that the application shell loads and the status changes to **Offline mode**.
5. Open the dashboard and IPv4 calculator routes.
6. Perform an IPv4 calculation and confirm that no network access is required.
7. Confirm that an unknown route still renders through the application shell.

## Cache upgrade

1. Return the network setting to **Online**.
2. Reload once so the newest service worker can install and activate.
3. Confirm that only the current `netadmin-toolbox-*` cache remains.
4. Switch back to **Offline** and reload.
5. Confirm that the updated application shell still loads.

## Pass criteria

The verification passes when installation succeeds, the service worker controls the application, offline reload works, cached routes remain usable, and obsolete application caches are removed.
