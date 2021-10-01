import Vue from 'vue';
import App from './App.vue';
import router from './router';
import firebase from 'firebase';
import 'firebase/firestore';
import store from './store';


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



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')

