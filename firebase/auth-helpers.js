import { auth, db } from './firebase-init.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

export const ROLE_HOME = {
  user: '../user/home.html',
  renter: '../renter/renter.html',
  admin: '../admin/admin.html'
};

function usernameKey(username) {
  return username.trim().toLowerCase();
}

export async function resolveEmailFromUsername(username) {
  const snap = await getDoc(doc(db, 'usernames', usernameKey(username)));
  if (!snap.exists()) throw new Error('No account found with that username.');
  return snap.data().email;
}

export async function signUp({ fullName, icNumber, username, phone, email, password, role }) {
  const uKey = usernameKey(username);
  const existing = await getDoc(doc(db, 'usernames', uKey));
  if (existing.exists()) throw new Error('That username is already taken.');

  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = credential.user.uid;

  await setDoc(doc(db, 'users', uid), {
    uid,
    fullName,
    username,
    email,
    phone,
    icNumber,
    role,
    status: 'active',
    avatarUrl: null,
    bookingsCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  await setDoc(doc(db, 'usernames', uKey), { uid, email });

  return { uid, role };
}

export async function logIn(username, password) {
  const email = await resolveEmailFromUsername(username);
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const uid = credential.user.uid;

  const profileSnap = await getDoc(doc(db, 'users', uid));
  if (!profileSnap.exists()) {
    await signOut(auth);
    throw new Error('No profile found for this account.');
  }
  const profile = profileSnap.data();
  if (profile.status === 'blocked') {
    await signOut(auth);
    throw new Error('This account has been suspended. Contact support for help.');
  }

  return { uid, role: profile.role, profile };
}

export function logOut() {
  return signOut(auth);
}

export function resetPassword(username) {
  return resolveEmailFromUsername(username).then(email => sendPasswordResetEmail(auth, email));
}

/**
 * Resolves once with { uid, role, profile } if signed in with an allowed role.
 * Redirects (and rejects) otherwise — to redirectTo if signed out, or to the
 * user's own dashboard if signed in but with the wrong role.
 */
export function requireAuth(allowedRoles, redirectTo = '../user/login.html') {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = redirectTo;
        reject(new Error('Not signed in'));
        return;
      }
      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        if (!snap.exists()) {
          window.location.href = redirectTo;
          reject(new Error('No profile found'));
          return;
        }
        const profile = snap.data();
        if (profile.status === 'blocked') {
          await signOut(auth);
          window.location.href = redirectTo;
          reject(new Error('Account suspended'));
          return;
        }
        if (allowedRoles && !allowedRoles.includes(profile.role)) {
          window.location.href = ROLE_HOME[profile.role] || redirectTo;
          reject(new Error('Not authorized for this role'));
          return;
        }
        resolve({ uid: user.uid, role: profile.role, profile });
      } catch (err) {
        reject(err);
      }
    });
  });
}

/**
 * For public pages: swaps the header profile link between a "Login / Sign Up" button
 * (signed out) and the user's avatar + a "view profile / logout" dropdown (signed in).
 * Expects the profile <a> to have the given id and to be reachable relative to the
 * current page as 'login.html' (and 'profile.html', for the "View Profile" option).
 */
export function renderAuthNav(profileLinkId = 'profileLink') {
  const link = document.getElementById(profileLinkId);
  if (!link) return;

  onAuthStateChanged(auth, async (user) => {
    const existingMenu = document.getElementById('profileMenu');
    if (existingMenu) existingMenu.remove();
    link.innerHTML = '';

    if (!user) {
      link.setAttribute('href', 'login.html');
      link.onclick = null;
      const loginBtn = document.createElement('span');
      loginBtn.textContent = 'Login / Sign Up';
      loginBtn.style.cssText = 'display:inline-block; padding:8px 16px; background-color:var(--primary); color:var(--on-primary, #ffffff); border-radius:8px; font-size:14px; font-weight:600; white-space:nowrap;';
      link.appendChild(loginBtn);
      return;
    }

    let displayName = user.email;
    let avatarUrl = '../../images/user_profile.jpg';
    try {
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (snap.exists()) {
        const data = snap.data();
        displayName = data.fullName || data.username || displayName;
        if (data.avatarUrl) avatarUrl = data.avatarUrl;
      }
    } catch (err) {
      // keep defaults
    }

    const img = document.createElement('img');
    img.alt = 'Profile';
    img.className = 'user-profile';
    img.src = avatarUrl;
    link.appendChild(img);

    link.removeAttribute('href');
    link.style.cursor = 'pointer';
    link.onclick = (e) => {
      e.preventDefault();
      toggleProfileMenu(link, displayName);
    };
  });
}

function toggleProfileMenu(anchorEl, displayName) {
  const existing = document.getElementById('profileMenu');
  if (existing) {
    existing.remove();
    return;
  }

  const menu = document.createElement('div');
  menu.id = 'profileMenu';
  menu.style.cssText = 'position:absolute; right:0; top:calc(100% + 8px); min-width:180px; background:var(--surface-container-lowest); border:1px solid var(--outline-variant); border-radius:8px; box-shadow:0 10px 25px rgba(0,0,0,0.15); padding:12px; z-index:200;';

  const nameEl = document.createElement('p');
  nameEl.style.cssText = 'font-weight:600; font-size:14px; margin-bottom:8px; word-break:break-word;';
  nameEl.textContent = displayName;
  menu.appendChild(nameEl);

  const viewProfileBtn = document.createElement('button');
  viewProfileBtn.type = 'button';
  viewProfileBtn.id = 'profileMenuViewBtn';
  viewProfileBtn.textContent = 'View Profile';
  viewProfileBtn.style.cssText = 'width:100%; text-align:left; background:none; border:none; cursor:pointer; color:var(--on-surface); font-size:13px; font-weight:600; padding:6px 0;';
  menu.appendChild(viewProfileBtn);

  const logoutBtn = document.createElement('button');
  logoutBtn.type = 'button';
  logoutBtn.id = 'profileMenuLogoutBtn';
  logoutBtn.textContent = 'Logout';
  logoutBtn.style.cssText = 'width:100%; text-align:left; background:none; border:none; cursor:pointer; color:var(--on-surface-variant); font-size:13px; padding:6px 0; margin-top:4px; border-top:1px solid var(--outline-variant);';
  menu.appendChild(logoutBtn);

  const wrapper = anchorEl.parentElement;
  wrapper.style.position = 'relative';
  wrapper.appendChild(menu);

  viewProfileBtn.addEventListener('click', () => {
    window.location.href = 'profile.html';
  });

  logoutBtn.addEventListener('click', async () => {
    await logOut();
    window.location.href = 'login.html';
  });

  setTimeout(() => {
    document.addEventListener('click', function handler(e) {
      if (!menu.contains(e.target) && e.target !== anchorEl && !anchorEl.contains(e.target)) {
        menu.remove();
        document.removeEventListener('click', handler);
      }
    });
  }, 0);
}
