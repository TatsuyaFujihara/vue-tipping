<template>
    <div id="app">
        <table>
        <tr>
          <th>メールアドレス：</th>
        </tr>
        <tr>
          <td><input type="email" v-model="mailaddress"/></td>
        </tr>
        <tr>
          <th>パスワード：</th>
        </tr>
        <tr>
          <td><input type="password" v-model="password"/></td>
        </tr>
      </table>
      <button @click="signUp">登録</button>
    </div>
</template>

<script>
// import Firestore from ".src//components/Firestore.vue"
export default {
    data() {
        return {
            mailaddress: "",
            password: ""
        };
    },
    methods: {
    signUp: function () {
        this.$firebase.auth().createUserWithEmailAndPassword(this.mailaddress, this.password)
    //   firebase.auth().createUserWithEmailAndPassword(this.mailaddress, this.password)
      .then(
        // 成功時の処理
      )
      .catch(
        // エラー時の処理 
      )
    }
  }
}
</script>

<style>
</style>
