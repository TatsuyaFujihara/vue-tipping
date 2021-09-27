<template>
  <div class="signup">
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
    created: function() {
    // firebaseのデータベースと接続
        this.db = firebase.firestore()
    // firestoreの"testuser"という名のコレクション
        this.dbData = this.db.collection("user")
        
    },
    methods: {
        signUp: function () {
        // firebaseのauth機能のメール認証を行う
            firebase.auth().createUserWithEmailAndPassword(this.mail, this.password)
            .then(user => {
                alert('Create account: ', user.email)
            })
            .catch(error => {
                alert(error.message)
            });
        // firebaseのデータベースへ【ユーザー名】と【メールアドレス】を保存
            this.dbData.add({
                username: this.username
            })
            .then(function () {
                alert('成功')
            })
            .catch(function () {
                alert('失敗')
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