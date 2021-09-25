<template>
    <div id="app">
    <h3>新規登録画面</h3>
        <label>ユーザー名 : <input type="text"></label><br>
        <label>メールアドレス : <input type="text"></label><br>
        <label>パスワード : <input type="text"></label>
        <!-- <label>ユーザー名 : <input type="text" v-model="username"></label><br>
        <label>メールアドレス : <input type="text"  v-model="mailaddress"></label><br>
        <label>パスワード : <input type="text" v-model="password"></label> -->
        <div>
            <button @click="signUp">登録</button>
        </div>

  </div>
</template>

<script>
export default {
    data() {
        return {     
        };
    },
    methods: {
    signUp: function () {
      this.irebase.auth().createUserWithEmailAndPassword(this.mailaddress, this.password)
      .then(
        console.log('成功')
      )
      .catch(
        console.log('失敗')
      )
    }
  }

}
</script>

<style>
</style>
