import Vue from "vue";
import Vuex from "vuex";
import firebase from 'firebase'
import router from './router';
import {db} from './main'


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        db: '',
        dbData: '',
        userDate: [],
        otherUser: []
    },

    getters: {
        user: state => state.userDate,
        otherUser: state => state.otherUser,
    },

    mutations: {
        signUp() {
            
        },
        login() {

        },
        home(state, {username, money}) {
            const userDate = {
                name: username,
                money: money
            };

            state.userDate.push(userDate); 
        },
        otherUser(state, {otherUser, userMoney}) {
            const otherUserDate = {
                name: otherUser,
                money: userMoney
            };
            state.otherUser.push(otherUserDate);
        }
    },
    
    actions: {
        signUp({commit}, {mail, password, username, dbData}) {
            firebase.auth().createUserWithEmailAndPassword(mail, password)
            .then(user => {
                console.log('Create account: ', user.email)
                router.push('/home')
            })
            .catch(error => {
                console.log(error.id)
            });
            
            dbData.doc(mail).set({
                mail: mail,
                username: username,
                money: '500'
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
                router.push('/home')
            })
            .catch(error => {
                console.log(error.id)
            });
            commit('login');
        },

        home({commit}) {
            const user = firebase.auth().currentUser;
            const mail = user.email;
        // ログイン状態のユーザー情報取得    
            db.collection('user').doc(mail).get()
            .then(function(doc) {
                const data = doc.data();
                const username = data.username;
                const money = data.money;
                commit('home', {username, money});
                
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
            
            // 他ユーザ情報の取得
            db.collection('user').where('mail', '!=', mail).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    const otherDate = doc.data();
                    const otherUser = otherDate.username;
                    const userMoney = otherDate.money;
                    // console.log(otherUser);
                    commit('otherUser', {otherUser, userMoney});
                });
            })
            .catch( (error) => {
                console.log(`データの取得に失敗しました (${error})`);
            });            
        },

        logout({commit}) {
            firebase.auth().signOut()
            .then(function () {
                router.push('/login')
            })
            .catch(function () {
                console.log('ログアウトが失敗しました')
            });
            commit('login');
        }
            
    }
});