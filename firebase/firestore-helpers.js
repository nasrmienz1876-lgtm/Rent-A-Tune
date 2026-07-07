import { db } from './firebase-init.js';
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

export { query, where, orderBy, limit, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

/** Escapes text before inserting it into innerHTML, since listing/profile text comes from other users. */
export function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str == null ? '' : String(str);
  return div.innerHTML;
}

export function docRef(collectionName, id) {
  return doc(db, collectionName, id);
}

export async function getOne(collectionName, id) {
  const snap = await getDoc(docRef(collectionName, id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function getMany(collectionName, ...queryConstraints) {
  const q = query(collection(db, collectionName), ...queryConstraints);
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function createDoc(collectionName, data) {
  const ref = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return ref.id;
}

export function updateDocFields(collectionName, id, data) {
  return updateDoc(docRef(collectionName, id), {
    ...data,
    updatedAt: serverTimestamp()
  });
}

export function removeDoc(collectionName, id) {
  return deleteDoc(docRef(collectionName, id));
}

/** Subscribes to a collection query; calls cb(items) on every change. Returns unsubscribe fn. */
export function subscribeToQuery(collectionName, queryConstraints, cb) {
  const q = query(collection(db, collectionName), ...queryConstraints);
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}

/** Subscribes to a subcollection query (e.g. conversations/{id}/messages). */
export function subscribeToSubQuery(parentCollection, parentId, subCollection, queryConstraints, cb) {
  const q = query(collection(db, parentCollection, parentId, subCollection), ...queryConstraints);
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}

export function createSubDoc(parentCollection, parentId, subCollection, data) {
  return addDoc(collection(db, parentCollection, parentId, subCollection), {
    ...data,
    createdAt: serverTimestamp()
  });
}
