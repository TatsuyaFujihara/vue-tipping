import Vue from "vue";
import Vuex from "vuex";
import firebase from 'firebase'
import router from './router';
import {db} from './main'


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
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
            state.userDate.splice(0, state.userDate.length);
            console.log(state.userDate.length);
            state.userDate.push(userDate);
        },
        otherUser(state, {otherUser, userMoney, userAddress}) {
            const otherUserDate = {
                name: otherUser,
                money: userMoney,
                mail: userAddress
            };
            state.otherUser.push(otherUserDate);
        },
        sendMoney(state) {
            state.otherUser.splice(0, state.otherUser.length);
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
// =========================ログイン中のユーザー情報の取得==============================
            db.collection('user').doc(mail).get()
            .then(function(doc) {
                const data = doc.data();
                const username = data.username;
                const money = data.money;
                commit('home', {username, money});
                
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
            
// =========================他ユーザーの取得==============================
            db.collection('user').where('mail', '!=', mail).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    const otherDate = doc.data();
                    const otherUser = otherDate.username;
                    const userMoney = otherDate.money;
                    const userAddress = otherDate.mail;
                    commit('otherUser', {otherUser, userMoney, userAddress});
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
        },
        sendMoney({state, dispatch, commit}, {receiveUser, userMoney, tradeMoney}) {
// =========================支払い動作==============================
            const mainUser = firebase.auth().currentUser;
            const mainUserMail = mainUser.email;
            const mainUserMoney = state.userDate[0].money;

            db.collection('user').doc(mainUserMail).update({
                money: mainUserMoney - tradeMoney
            })
            .then(function () {
                console.log('メインの更新に更新')
            })
            .catch(function () {
                console.log('メインの更新に失敗')
            });
            
// =========================送金動作==============================
            db.collection('user').doc(receiveUser).update({
                money: userMoney + Number(tradeMoney),
            })
            .then(function () {
                dispatch('home');
            })
            .catch(function () {
                console.log('送金に失敗しました')
            });
            commit('sendMoney');
        }
            
    }
});