import Vue from 'vue'
import Router from 'vue-router'
import Signup from './views/signup.vue'
import Login from './views/login.vue'
import Home from './views/home.vue'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
    mode: "history",
    routes: [
        {
            path: '/signup', 
            component: Signup
        },
        {
            path: '/login', 
            component: Login
        },
        {
            path: '/home',
            component: Home,
            meta: { requiresAuth: true },
        },
    ]
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(recode => recode.meta.requiresAuth);
    // const currentUser = firebase.getCurrentUser
    const currentUser = firebase.auth().currentUser
    
    if (requiresAuth) {
        if (!currentUser) {
            next({
                path: '/login',
                // query: { redirect: to.fullPath }
            }) 
        } else {
            next()
        }
    } else {
        next()
    }
});

export default router;