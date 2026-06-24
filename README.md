# SafeDismiss — Interactive Prototype

A high-fidelity, bilingual (English / Arabic with RTL) static prototype for **SafeDismiss**, a school
dismissal system. It is plain HTML/CSS/JS — no build step, no backend — designed to demonstrate the
user flows for every role.

**Live site:** https://tajaber.github.io/safedismissal/

## Roles & pages
| Page | Role |
|------|------|
| `index.html` | Landing / role chooser |
| `login.html` | Simulated secure login + MFA (OTP) |
| `moderator.html` | School Moderator — setup, invite parents (multiple kids by dismissal level), kid QR codes, audit log, gate-security toggle, terms |
| `admin.html` | Dismissal Admin — first-login approvals, dismissal methods, per-grade dismissal time frames & override deadlines |
| `parent.html` | Parent / Co-Parent — accept terms, announce arrival, request car override, dynamic daily pickup QR |
| `security.html` | Security / Gate — QR scan, phone fallback, confirm release |
| `dashboard.html` | System dashboard — KPIs, method split, live activity |

## Key features
- Bilingual EN/AR with full RTL, simulated MFA, role-based flows.
- Grade-based dismissal time frames (e.g. KG leaves earlier) with per-kid override cutoffs.
- Dynamic, day-scoped pickup QR codes.
- Notification center with cross-tab live sync.

## Running the tests (optional, for development)
The interactive site needs no dependencies. To run the included checks:

```bash
npm install          # installs jsdom (test-only)
node assets/validate.js .     # static i18n/link/syntax checks
node assets/smoke.test.js     # jsdom runtime tests
```

`node_modules/` is git-ignored and only needed locally for tests.
