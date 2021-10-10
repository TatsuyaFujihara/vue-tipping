<template>
  <div class="home">
    <h2>投げ銭ホーム</h2>
      <div class="user">
        <img src="@/assets/logo.png">
        <div class="userData" v-for="(user,index) in users" :key="index">
            <span class="name">{{user.name}}さんようこそ！</span>
            <span class="money">残高 : {{user.money}}</span>
        </div>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Home',
  data() {
    return {
        
      }
  },
  created: function() {
    const user = firebase.auth().currentUser;
    const mail = user.email;
    const db = firebase.firestore();
    
    this.$store.dispatch("home", {
      mail: mail,
      db: db
    })
  },
  computed: {
    users() {
      return this.$store.getters.user;
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
.home {
  margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center
}
.name, .money {
  display: inline-block;
}
.name {
  margin-right: auto;
}
.userData {
  display: flex;
}
input {
  margin: 10px 0;
  padding: 10px;
}
</style>