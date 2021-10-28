<template>
  <div class="signup">
    <img src="@/assets/logo.png">
    <h2>Sign up</h2>
        <table>
            <tr>
                <td>ユーザー名</td>
                <td><input type="text" placeholder="Username" v-model="username"></td>
            </tr>
            <tr>
                <td>メールアドレス</td>
                <td><input type="text" placeholder="Mail" v-model="mail"></td>
            </tr>
            <tr>
                <td>パスワード</td>
                <td><input type="password" placeholder="Password" v-model="password"></td>
            </tr>
        </table>
        <button @click="signUp">新規登録</button>
  </div>
</template>


<script>
import firebase from 'firebase'
import 'firebase/firestore';

export default {
  name: 'Signup',
    data () {
        return {
            db: '',
            dbData: '',

            username: '',
            mail: '',
            password: ''
        }
    },
    methods: {
        signUp: function () {
            this.db = firebase.firestore()
            this.dbData = this.db.collection("user")
            
            this.$store.dispatch("signUp", {
                // username: this.username,
                mail: this.mail,
                password: this.password,
                username: this.username,
                dbData: this.dbData
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
.signup {
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