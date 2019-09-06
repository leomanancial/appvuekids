<template>
  <div class="home">
    <h1>
      Olá
      <span class="nome-logado">{{this.email}}</span> , graça e paz !
    </h1>
    <div id="dash-header">DASHBOARD DIÁRIO</div>
    <div class="dash">
      <div class="card text-white bg-primary mb-3" style="max-width: 18rem; margin:20px ">
        <div class="card-header">2 e 3 anos</div>
        <div class="card-body">
          <h5 class="card-title">Primary card title</h5>
          <p
            class="card-text"
          >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
      <div class="card text-white bg-secondary mb-3" style="max-width: 18rem; margin:20px">
        <div class="card-header">4 anos</div>
        <div class="card-body">
          <h5 class="card-title">Secondary card title</h5>
          <p
            class="card-text"
          >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
      <div class="card text-white bg-success mb-3" style="max-width: 18rem; margin:20px">
        <div class="card-header">5 e 6 anos</div>
        <div class="card-body">
          <h5 class="card-title">Success card title</h5>
          <p
            class="card-text"
          >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
    </div>
    <div class="dash">
      <div class="card text-white bg-danger mb-3" style="max-width: 18rem; margin:20px">
        <div class="card-header">7 e 8 anos</div>
        <div class="card-body">
          <h5 class="card-title">Danger card title</h5>
          <p
            class="card-text"
          >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
      <div class="card text-white bg-warning mb-3" style="max-width: 18rem; margin:20px">
        <div class="card-header">9 e 10 anos</div>
        <div class="card-body">
          <h5 class="card-title">Warning card title</h5>
          <p
            class="card-text"
          >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
      <div class="card text-white bg-info mb-3" style="max-width: 18rem; margin:20px">
        <div class="card-header">11 e 12 anos</div>
        <div class="card-body">
          <h5 class="card-title">Info card title</h5>
          <p
            class="card-text"
          >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
    </div>
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
    //console.log(nomeInicio);
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

.dash {
  display: flex;
  margin-right: 10px;
  margin: 0;
  /* padding: 3px; */
  flex-flow: row;
}
.item-dash {
  max-width: 100%;
  background-color: yellow;
  margin: 5px;
  padding-top: 50px;
}
#dash-header {
  max-width: 100%;
  font-weight: bolder;
  padding: 10px;
  border-radius: 5px;
  font-size: 12pt;
  background-color: #faac58;
  color: var(--gray);
  margin: 0;
}
</style>


