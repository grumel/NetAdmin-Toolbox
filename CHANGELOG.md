# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog and the project follows Semantic Versioning.

## [Unreleased]

### Added

- Cisco static-route helper.
- Cisco OSPF network command helper.
- Cisco interface name converter.
- Cisco ACL optimizer for duplicate and shadowed rules.
- Cisco VLAN calculator and configuration generator.
- Cisco extended IPv4 ACL generator.
- IPv6 reverse-DNS names in RFC 3596 nibble format.
- Shared IPv4, IPv6, CIDR, hostname, and FQDN validation.
- CSV export for network-tool results.
- Print-oriented result layouts and expanded repository documentation.

### Changed

- IPv4 localization, validation feedback, and accessibility coverage.
- Service-worker caching and offline application-shell handling.

## [0.5.0] - 2026-07-19

### Added
- IPv6 calculator foundation and IPv6 network utilities
- CIDR and wildcard tools
- VLSM subnet planning
- Route summarization
- Central searchable tool catalog
- Favorites and recently used tools on the dashboard
- German and English localization
- Settings import and export
- Progressive Web App installation and offline support
- Automatic conversion when a complete valid MAC address is entered
- Visible application version on the dashboard

### Changed
- Hardened IPv4 calculations and validation
- Improved asynchronous router behavior
- Improved dashboard compatibility with older cached tool-catalog modules
- Updated GitHub Actions and supported Node.js versions
- Improved Service Worker cache handling

### Fixed
- Dashboard failures caused by stale cached module exports
- Browser-only global access in the localization module during tests
- PWA tests that depended on source formatting
- IPv6 ULA detection for both `fc00::/8` and `fd00::/8`

## [0.1.0] - 2026-07-18

### Added
- Initial repository setup
- Professional README
- MIT License
- CHANGELOG

[Unreleased]: https://github.com/grumel/NetAdmin-Toolbox/compare/v0.5.0...HEAD
[0.5.0]: https://github.com/grumel/NetAdmin-Toolbox/releases/tag/v0.5.0
