<template>
    <div class="login">
        <img src="@/assets/logo.png">
        <h2>Login</h2>
        <table>
            <tr>
                <td>メールアドレス</td>
                <td><input type="text" placeholder="Mail" v-model="mail"></td>
            </tr>
            <tr>
                <td>パスワード</td>
                <td><input type="password" placeholder="Password" v-model="password"></td>
            </tr>
        </table>
        <button @click="Login">ログイン</button>
    </div>
</template>


<script>


export default {
  name: 'login',
    data () {
        return {
            mail: '',
            password: ''
        }
    },
    methods: {
        Login: function () {
            this.$store.dispatch("login", {
                // username: this.username,
                mail: this.mail,
                password: this.password,
            })
        }
    }
}
</script>


<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.login {
  margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center
}
input {
  margin: 10px 0;
  padding: 10px;
}
</style>