# Supported browsers

NetAdmin Toolbox targets current evergreen browsers with ES module, Service Worker, Web App Manifest, Clipboard and Web Crypto support.

| Browser | Support target |
| --- | --- |
| Google Chrome | Current and previous major version on desktop and Android |
| Microsoft Edge | Current and previous major version on Windows |
| Mozilla Firefox | Current and previous major version on desktop and Android |
| Apple Safari | Current and previous major version on macOS and iOS |

The application is served over HTTP(S); opening `index.html` with `file://` is not supported because modules and service workers require an origin. Release verification covers online startup, offline reload, installation, keyboard navigation and responsive layouts.
