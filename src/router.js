import Vue from 'vue'
import Router from 'vue-router'
import Signup from './views/signup.vue'
import Login from './views/login.vue'

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        {path: '/signup', component: Signup},
        {path: '/login', component: Login}
    ]
})