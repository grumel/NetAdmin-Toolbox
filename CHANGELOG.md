# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog and the project follows Semantic Versioning.

## [Unreleased]
- Completed the Linux administration toolkit and stable-release documentation baseline.
- Added a local nftables/iptables firewall rule helper.
- Added a local OpenSSH configuration helper.
- Added a local systemd service-unit builder.
- Added a local cron entry generator.
- Added a local chmod permission calculator.
- Added a local URL component encoder and decoder.
- Added a secure local UUID v4 generator.
- Added a local regular expression tester.
- Added a local XML formatter and validation feedback.
- Added a dependency-free YAML indentation formatter.

- Added a local JSON formatter and validator.

### Added

- Local Base64 encoder and decoder.
- Local JWT header and payload decoder.
- Local PEM certificate inspector.
- Local Web Crypto hash generator.
- Local cryptographic password generator.
- IPv6 prefix delegation helper.
- Cisco MPLS label configuration helper.
- Cisco VXLAN NVE configuration helper.
- Cisco QoS classification and priority helper.
- Cisco STP helper for root-role and priority commands.
- Versioned release-candidate checklist and metadata test.
- Offline and installability release verification guide and test.
- Supported-browser matrix and verification guidance.
- Accessibility and performance baseline documentation with catalog checks.
- Local network diagnostics for IPv4 addresses and hostnames.
- Windows PowerShell registry helper.
- Windows DHCP scope helper.
- Windows SID parser and GUID v4 generator.
- PowerShell generator for safe ping and DNS commands.
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
