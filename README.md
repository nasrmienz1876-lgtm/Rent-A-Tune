# Rent A Tune

A web platform for renting musical instruments and booking live bands in Malaysia. Customers can search, compare and book instruments, bundle packages and performers in one place, with escrow-style payment protection.

**Live site:** https://rent-a-tune.vercel.app/

> Final-year project for the Diploma in Information Technology (CPT4214), Faculty of Computing & Informatics, Multimedia University (MMU).

<!-- Add 2-3 screenshots here, e.g. ![Marketplace](docs/screenshots/marketplace.png) -->

## Why this exists

Instrument rentals and band hiring in Malaysia are scattered across shops, social media and personal contacts. Existing sites lack search and comparison, transparent pricing, bundle options and integrated booking. Rent A Tune brings these into a single platform (see the competitor analysis in the project report).

## Features

**Customers**
- Browse, search and filter instruments, bundles and live bands
- Chat with renters/performers to negotiate, and book with a date-aware rental calendar
- Checkout with an escrow-style payment flow, order history and ratings

**Renters / Performers**
- Manage listings (instruments, bundles, bands) and inventory
- Accept or reject bookings, view earnings and reviews, request payment
- Report damage on returned items

**Admins**
- Monitor users, renters, listings, transactions and reports with filters and pagination
- Chat monitoring that flags violations (phone numbers, social handles, off-platform payment requests)
- Dual-confirmation escrow release (customer confirms + renter reports no damage, then admin releases)

## Tech stack

- HTML, CSS, vanilla JavaScript (ES modules)
- Firebase Authentication, Cloud Firestore, Firebase Storage
- Firestore security rules with role-based access control (`firebase/firebase.rules`)
- Deployed on Vercel

## Project structure

```
pages/user/     Customer pages (home, marketplace, checkout, chat, orders, profile, support)
pages/renter/   Renter/performer dashboard
pages/admin/    Admin login and console
firebase/       Firebase init, auth/Firestore helpers, security rules
shared/         Shared UI (styled dialogs)
images/         Static assets
docs/           Project report and final presentation
```

## Running locally

No build step. Serve the folder with any static server (ES modules don't work from `file://`):

```bash
python -m http.server 8000
# open http://localhost:8000/pages/user/home.html
```

The app connects to the project's Firebase backend. To use your own, replace the config in `firebase/firebase-init.js` and publish `firebase/firebase.rules` in the Firebase console.

## Testing

90 manual test cases across 9 modules (authentication, access control, marketplace, messaging, checkout, renter dashboard, admin dashboard, support, home) are documented in the project report in `docs/`.

## Known limitations

- Payments are **simulated**; no real payment gateway is integrated (FPX/Stripe is listed as future work).
- Planned: SMS/email notifications, a mobile app and AI-based recommendations.

## Team

| Member | Role |
|---|---|
| Ahmad Syahmi | Team leader, project report, testing/QA, code review and bug-fix guidance, some development |
| Nasr Muhaimin | Lead developer (front-end and Firebase implementation) |
| Harris Danniel | Research, report writing, presentation |

Supervisors: Ms. Ruzanna Binti Abdullah (primary), Nik Intan Syahiddatul Nur Binti Jailani (secondary).
