# Rent A Tune

## Deployment workflow

After making code changes in this repo, always commit and push to GitHub (`origin/main`) at the end of the turn, without asking for confirmation first. This repo's Vercel project auto-deploys from GitHub, so pushing is how changes go live. Write a clear commit message describing what changed and why.

Do not push if the changes are incomplete/broken, or if the user explicitly said not to commit yet.

Note: Firestore security rules (`firebase/firebase.rules`) and Storage rules are **not** deployed by this GitHub push — they live in Firebase and must be published separately via the Firebase Console (Firestore Database → Rules / Storage → Rules) or the Firebase CLI. Flag it clearly whenever a change touches `firebase.rules` so the user knows to publish it too.
