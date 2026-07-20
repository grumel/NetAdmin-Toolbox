# Release verification

Before a stable release, serve the repository through HTTP on port 8001, open the application in a supported browser, and verify:

1. The manifest is detected and the install prompt is available.
2. The service worker registers without console errors.
3. Every listed tool opens and renders its initial state.
4. After the first load, disabling the network still permits navigation and calculation tools to operate.
5. The installed application starts from the operating-system app launcher.

Record browser, operating system, cache state and date for each verification run. A failed offline or installability check blocks the release.
