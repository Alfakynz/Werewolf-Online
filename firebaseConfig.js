const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, get, child, remove } = require('firebase/database');
const { getDocs, getFirestore, collection } = require('firebase/firestore')
//import {initializeApp } from 'firebase/app';
//import { getDatabase, ref, set, get, child, remove } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDS7Fe4UDxlF5rIO9HmcuK3yi19MGHabz8",
  authDomain: "werewolf-online-6e8ae.firebaseapp.com",
  databaseURL: "https://werewolf-online-6e8ae-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "werewolf-online-6e8ae",
  storageBucket: "werewolf-online-6e8ae.appspot.com",
  messagingSenderId: "1029957047339",
  appId: "1:1029957047339:web:39ae24e45563d9770b466e",
  measurementId: "G-6WMSCW4QFH"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const app2 = initializeApp(firebaseConfig);
const db = getFirestore(app2);

var users;

const setUsers = async () => {
  const usersCollection = collection(db, 'users');
  const snapshot = await getDocs(usersCollection);
  const dataList = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  users = dataList.sort((a, b) => a.name.localeCompare(b.name));
};

setUsers();

// Exportation des fonctions si nécessaire
module.exports = { database, db, users };