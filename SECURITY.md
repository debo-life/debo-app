# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Debo, please report it responsibly. **Do not open a public issue.**

Instead, send an email to: **mail@30tools.com**

Please include:

- A description of the vulnerability
- Steps to reproduce the issue
- The potential impact
- Any suggested fixes (if you have them)

We will try to review security reports as quickly as possible and will coordinate with you on disclosure.

## Scope

The following are in scope for security reports:

- Desktop application security
- Local data storage and handling
- Tauri/Rust command vulnerabilities
- Dependency vulnerabilities
- Cross-site scripting (XSS) in the web view
- Privilege escalation
- Data leakage between processes

## Out of Scope

The following are not in scope:

- Social engineering attacks
- Spam
- Attacks requiring physical access to the user's device without their consent
- Denial of service attacks
- Issues in third-party dependencies (report these upstream)

## Supported Versions

| Version | Supported |
| ------- | --------- |
| Latest  | Yes       |
| Older   | No        |

We recommend always running the latest version of Debo.

## Disclosure Policy

We follow a coordinated disclosure process:

1. Report received and acknowledged
2. Issue investigated and confirmed
3. Fix developed and tested
4. Security advisory published (if applicable)
5. Reporter credited (unless they prefer anonymity)

Thank you for helping keep Debo and its users safe.
