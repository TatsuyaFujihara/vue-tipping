import Vue from "vue";
import Vuex from "vuex";
import firebase from 'firebase'
// import 'firebase/firestore';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        db: '',
        dbData: '',
    },

    getters: {
        
    },

    mutations: {
        signUp() {
            
        },
        login() {
            
        },
    },

    actions: {
        signUp({commit}, {mail, password, username, dbData}) {
            firebase.auth().createUserWithEmailAndPassword(mail, password)
            .then(user => {
                console.log('Create account: ', user.email)
            })
            .catch(error => {
                console.log(error.id)
            });
            
            dbData.add({
                username: username
            })
            .then(function () {
                console.log('ユーザー名登録-成功')
            })
            .catch(function () {
                console.log('ユーザー名登録-失敗')
            });
            commit('signUp');
        },
        login({commit}, {mail, password}) {
            firebase.auth().signInWithEmailAndPassword(mail, password)
            .then(user => {
                console.log('ログイン成功', user.email)
            })
            .catch(error => {
                console.log(error.id)
            });
            commit('login');
        }
            
    }
});