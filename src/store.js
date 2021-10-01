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
        success() {
            console.log("成功");
        },
        miss() {
            console.log("失敗");
        },
        
    },

    actions: {
        signUp({commit}, { mail, password, username, dbData}) {
            firebase.auth().createUserWithEmailAndPassword(mail, password)
            .then(user => {
                commit('success', user);
            })
            .catch(error => {
                commit('miss', error);
            });
            
            dbData.add({
                username: username
            })
            .then(function () {
                console.log('成功')
            })
            .catch(function () {
                console.log('失敗')
            })
        },
    }
});