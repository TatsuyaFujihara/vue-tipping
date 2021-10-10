<template>
    <div id="app">
        <div>
          <router-link class="link" to="Signup">新規登録へ</router-link>
          <router-link class="link" to="Login">ログインページへ</router-link>
          <router-link class="link" to="Home">ホーム</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    methods: {
        toSignup(){
            this.$router.push('/signup')
        },
        toLogin(){
            this.$router.push('/login')
        },
        toHome(){
            this.$router.push('/home')
        }
    },
}
</script>

<style>
.link {
  padding: 10px;
}
</style>