<template>
  <div class="home">
    <h1>Olá <span class="nome-logado">{{this.email}}</span> , graça e paz !</h1>
    <p><span style="font-weight:bold">IMPORTANTE: </span></p><p>O <span style="font-weight:bold">LÍDER DO DIA</span> está vinculada a esta conta, e a <span style="font-weight:bold">Lista de Presença</span> será salva com esta informação.
    Então caso não seja o  <span style="font-weight:bold">Líder do dia</span>, clique em sair e se logue com a conta correta.</p>.
    
  </div>
</template>

<script>
import groupby from "lodash.groupby";

export default {
  data: () => ({
    email: "",
    foto: "",
    mostraLider: []
  }),

  created() {
    var user = this.$firebase.auth().currentUser;
    let nomeInicio = user.email.split("@");
    console.log(nomeInicio);
    this.email = nomeInicio[0];
    this.foto = user.photoURL;
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

#foto-home {
  max-width: 5% !important;
  padding: 0;
}
</style>


