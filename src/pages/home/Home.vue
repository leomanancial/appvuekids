<template>
  <div class="home">
    <h1>SejaBem vindo</h1>
    <img v-bind:src="this.foto" class="rounded-circle" id="foto-home">
    <h2 class="nome-logado">{{this.email}}</h2>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: "",
    foto: ""
  }),

  created() {
    var user = this.$firebase.auth().currentUser;
    this.email = user.displayName;
    this.foto = user.photoURL;
    //console.log(this.email)
  }
};
</script>
<style scoped lang="scss">
.nome-logado {
  font-family: "Luckiest Guy", cursive !important;
  font-size: 20pt !important;
  margin-top: 10px !important;
  color: cadetblue;
}

#foto-home{
  max-width: 5% !important;
  padding: 0;
}
</style>


