# Performance baseline

The application remains dependency-free and uses route-level ES module loading so unused tools are not loaded on startup. Performance work is measured with the browser Performance panel on a cold load and an offline reload.

Release checks should record first contentful paint, route transition responsiveness, and service-worker cache behavior on a representative desktop and mobile browser. Avoid synchronous network requests, unnecessary DOM rebuilds, and duplicated calculation work.
