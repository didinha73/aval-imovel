import React from 'react';
import ReactDOM from 'react-dom/client';

import Dashboard from './Dashboard';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBroz-TjszmNGF_szcYznlSP-8J3HKKRx0",
  authDomain: "aval-imovel-c616c.firebaseapp.com",
  projectId: "aval-imovel-c616c",
  storageBucket: "aval-imovel-c616c.appspot.com",
  messagingSenderId: "10163610832",
  appId: "1:10163610832:web:feee432b1e30679f35aad5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>
);

