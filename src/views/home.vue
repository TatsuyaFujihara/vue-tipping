<template>
  <div class="home">
    <h2>投げ銭ホーム</h2>
    <img src="@/assets/logo.png">
      <div class="user">
        <table class="userData" v-for="(user,index) in users" :key="index">
          <tbody>
            <td class="name">{{user.name}}さんようこそ！</td>
            <td class="money">
              残高 : {{user.money}}
              <button class="logout" @click="Logout">ログアウト</button>
            </td>
          </tbody>    
        </table>
      </div>

    <h1>ユーザー一覧</h1>
    <table>
      <thead>
        <th>ユーザー名</th>
      </thead>
      <tbody>
        <tr v-for="(otherUser,index) in otherUsers" :key="index">
          <td>{{otherUser.name}}</td>
          <td>
            <button class="wallet" @click="userWallet(index)">walletを見る</button>
            <button class="send" @click="sendMoneyModal(index)">送る</button>
          </td>
        </tr>

          <transition name="fade" appear>
            <div class="modal-overlay" v-if="infoModal"></div>
          </transition>
          <transition name="slide" appear>
            <div class="modal" v-if="infoModal">
              <p>{{otherUserName}}さんの残高</p>
              <p>{{therUserMoney}}</p>
              <button id="close" class="button" @click="infoModal = false">
                閉じる
              </button>
            </div>
          </transition>

          <transition name="fade" appear>
            <div class="modal-overlay" v-if="sendModal"  @click="sendModal = false"></div>
          </transition>
          <transition appear>
            <div class="modal" v-if="sendModal">
              <div v-for="(user,index) in users" :key="index">
                <p>あなたの残高：{{user.money}}</p>
                <input type="number" v-model="tradeMoney">
                <button id="close" class="button" @click="sendMoney">
                  送信
                </button>
              </div>
            </div>
          </transition>

      </tbody>
    </table>
    

  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
        infoModal: false, 
        sendModal: false, 

        otherUserName: "",
        otherUserMoney: "",

        userId: "",
        tradeMoney: "",
      }
  },
  created: function() {
    this.$store.dispatch("home")
  },
  computed: {
    users() {
      return this.$store.getters.user;
    },
    otherUsers() {
      return this.$store.getters.otherUser;
    }
  },
  methods: {
    Logout: function () {
      this.$store.dispatch("logout")
    },
    userWallet: function(index){
      const userInfo = this.$store.getters.otherUser[index];
      this.otherUserName = userInfo.name;
      this.therUserMoney = userInfo.money;
      this.infoModal = true;
    },
    sendMoneyModal: function(index){
      this.userId = index;
      this.sendModal = true;
    },
    sendMoney: function(){
      const userInfo = this.$store.getters.otherUser[this.userId];
      const receiveUserAdd = userInfo.mail;
      const userMoney = userInfo.money;
            
      this.$store.dispatch("sendMoney", {
        receiveUser: receiveUserAdd,
        userMoney: userMoney,
        tradeMoney: this.tradeMoney,
      });
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
th {
  font-size: 120%;
}
table {
  border-collapse: separate;
  border-spacing: 100px 0px;
}
input {
  margin: 10px 0;
  padding: 10px;
}

.wallet {
  background-color: dodgerblue;
  color: aliceblue;
}
.send {
  background-color: dodgerblue;
  color: aliceblue;
}
.home {
  margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.modal {
 position: fixed;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
 z-index: 99;
 
 width: 100%;
 max-width: 200px;
 background-color: #FFF;
 border-radius: 16px;

 justify-content: center;
 align-items: center;
 display: flex;
 flex-flow: column nowrap;
 
 padding: 25px;
}
.modal-overlay {
 position: fixed;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 z-index: 98;
 background-color: rgba(0, 0, 0, 0.3);
}

</style>