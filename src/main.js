import Vue from 'vue'
import App from './App.vue'
import router from './router';
// import { initializeApp } from "firebase/app";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyDt3mQIGqLCYYJdhVI_m07xcd453Iaa4Gw",
  authDomain: "social-tipping-97b2a.firebaseapp.com",
  projectId: "social-tipping-97b2a",
  storageBucket: "social-tipping-97b2a.appspot.com",
  messagingSenderId: "397470261339",
  appId: "1:397470261339:web:536ea503f22389a5b05f7e",
  measurementId: "G-EXLEYDPDVQ"
};
firebase.initializeApp(firebaseConfig);

// const app = initializeApp(firebaseConfig);
// console.log(app);
// const analytics = getAnalytics(app);
// const auth = getAuth();

// onAuthStateChanged(auth, user => { console.log(user); });
// onAuthStateChanged(auth, user => {
//   if (user != null) {
//     console.log('成功');
//   } else {
//     console.log('失敗');
//   }
// })


new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount('#app')

