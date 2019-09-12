<template>
  <div class="home">
    <h1>
      Olá
      <span class="nome-logado">{{this.email}}</span> , graça e paz !
    </h1>

    <!-- CORES SALAS
        - Amarelo 11 e 12
        - Verde 9 e 10
        - Azul 7 e 8
        - Laranja 5 e 6
    - Vermelho 4-->
    <div id="dash-header">DASHBOARD DO DIA {{this.dataHoje}}</div>
    <div class="dash">
      <div class="card text-white bg-secondary" style="max-width: 18rem; margin:20px ">
        <div class="card-header">2 e 3 anos</div>
        <div class="card-body">
          <h5 class="card-title">Alunos Presentes</h5>
          <h3 class="card-text">{{this.qtSala.gray?this.qtSala.gray:"0"}}</h3>
        </div>
      </div>
      <div class="card text-white bg-danger" style="max-width: 18rem; margin:20px">
        <div class="card-header">4 anos</div>
        <div class="card-body">
          <h5 class="card-title">Alunos Presentes</h5>
          <h3 class="card-text">{{this.qtSala.red?this.qtSala.red:"0"}}</h3>
        </div>
      </div>
      <div class="card text-white bg-warning" style="max-width: 18rem; margin:20px">
        <div class="card-header">5 e 6 anos</div>
        <div class="card-body">
          <h5 class="card-title">Alunos Presentes</h5>
          <h3 class="card-text">{{this.qtSala.orange?this.qtSala.orange:"0"}}</h3>
        </div>
      </div>
    </div>
    <div class="dash">
      <div class="card text-white bg-primary" style="max-width: 18rem; margin:20px">
        <div class="card-header">7 e 8 anos</div>
        <div class="card-body">
          <h5 class="card-title">Alunos Presentes</h5>
          <h3 class="card-text">{{this.qtSala.blue?this.qtSala.blue:"0"}}</h3>
        </div>
      </div>
      <div class="card text-white bg-success" style="max-width: 18rem; margin:20px">
        <div class="card-header">9 e 10 anos</div>
        <div class="card-body">
          <h5 class="card-title">Alunos Presentes</h5>
          <h3 class="card-text">{{this.qtSala.green?this.qtSala.green:"0"}}</h3>
        </div>
      </div>
      <div class="card text-white bg-orange" style="max-width: 18rem; margin:20px">
        <div class="card-header">11 e 12 anos</div>
        <div class="card-body">
          <h5 class="card-title">Alunos Presentes</h5>
          <h3 class="card-text">{{this.qtSala.yellow?this.qtSala.yellow:"0"}}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import groupby from "lodash.groupby";
import countby from "lodash.countby";
import moment from "moment";
import { Promise, reject } from "q";

export default {
  data: () => ({
    email: "",
    foto: "",
    mostraLider: [],
    refListaPresenca: [],
    diario: "",
    qtSala: []
  }),

  created() {
    var user = this.$firebase.auth().currentUser;
    let nomeInicio = user.email.split("@");
    //console.log(nomeInicio);
    this.email = nomeInicio[0];
    this.foto = user.photoURL;

    //this.dataHoje = "08-09-2019";
    this.dataHoje = moment(data).format("DD-MM-YYYY");
    const data = new Date();
    /*  new Intl.DateTimeFormat("en-US").format(this.dataBusca); */
    //this.dataHoje = new Intl.DateTimeFormat("en-US").format(data);
    const ref = this.$firebase.database().ref("ListaPresenca");
    ref.on("value", snapshot => {
      const values = snapshot.val();
      for (let i in values) {
        if (i == this.dataHoje) {
          let y = countby(values[i], "salaL");
          //console.log(y["7 e 8 anos"]);
          this.qtSala = {
            gray: y["2 e 3 anos"],
            red: y["4 anos"],
            orange: y["5 e 6 anos"],
            blue: y["7 e 8 anos"],
            green: y["9 e 10 anos"],
            yellow: y["11 e 12 anos"]
          };
        }
      }
    });
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
.card {
  width: 70%;
  max-width: 100%!important;
}
.dash {
  display: flex;
  margin-right: 10px;
  margin: 0;
  padding: 3px; 
  flex-flow: row;
}
.item-dash {
  width: 100%;
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
.card-text {
  text-align: center;
  font-weight: bold;
  font-size: 30px;
}

.card-title{
  text-align: center
}
.card-header{
  text-align: center;
  font-size: 30px;
}

.bg-orange {
  background-color: orangered;
}
</style>


