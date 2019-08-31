<template>
  <div class="container-fluid">
    <h1>Listas Salvas</h1>
    <div class="row">
      <div class="form-group col-3">
        <small id="emailHelp" class="form-text text-muted">Data início</small>
        <input class="form-control" type="date" v-model="dataInicio" />
      </div>
      <!--   <div class="form-group col-3">
        <small id="emailHelp" class="form-text text-muted">Data final</small>
        <input class="form-control" type="date" v-model="dataFinal" />
      </div>-->
      <div class="form-group col-2">
        <small id="emailHelp" class="form-text text-muted">Pesquisa Lista</small>
        <button class="btn btn-info" @click.prevent="busca">Pesquisar</button>
      </div>
    </div>
    <div>
      <h2>Lider do Dia: {{this.liderOne}}</h2>
    </div>
    <div class="row" id="lista-alunos-header">
      <div class="col-1">Foto</div>
      <div class="col-1">Matricula</div>
      <div class="col-2">Nome</div>
      <div class="col-2">Data</div>
      <div class="col-1">Sala</div>
      <div class="col-1">Cartão</div>
      <div class="col-4">Observação</div>
    </div>
    <hr />
    <div id="teste">
      <div v-for="item in this.refListaData" class="lista-alunos-item row" id="lista-alunos">
        <div v-if="item.fotoL" class="col-1 foto">
          <img v-bind:src="item.fotoL" class="rounded-circle" />
        </div>
        <div class="col-1">{{item.idL}}</div>
        <div class="col-2">{{item.nomeL}}</div>
        <div class="col-2">{{item.dataListaL}}</div>
        <div class="col-1">{{item.salaL}}</div>
        <div class="col-1">{{item.cartao}}</div>
        <div class="col-4">{{item.obs}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import groupby from "lodash.groupby";

export default {
  name: "Listas-Salvas",
  data: () => {
    return {
      a: [],
      b: [],
      refListaData: [],
      refListaPresenca: [],
      dataInicio: "",
      dataFinal: "",
      dataHoje: "",
      mostraLista: false,
      compara: "",
      liderDoDia: "",
      dataL: [],
      vazia: "",
      liderOne: ""
    };
  },

  created() {
    const data = new Date();
    /*  new Intl.DateTimeFormat("en-US").format(this.dataBusca); */
    this.dataHoje = new Intl.DateTimeFormat("en-US").format(data);
    /* this.dataHoje = moment(data).format("DD/MM/YYYY"); */
    const ref = this.$firebase.database().ref("ListaAlunos");
    ref.on("value", snapshot => {
      const values = snapshot.val();
      this.refListaPresenca = Object.keys(values).map(i => values[i]);
    });
  },

  methods: {
    busca() {
      this.refListaData = [];
      this.liderOne = "";
      const dataInicioFormat = moment(this.dataInicio).format("DD/MM/YYYY");
      const dataFinalFormat = moment(this.dataFinal).format("DD/MM/YYYY");
      const ref = this.$firebase.database().ref("ListaPresenca");

      ref.on("value", snapshot => {
        const values = snapshot.val();
        console.log(this.values);
        this.dataL = groupby(values, "dataListaL");
      });

      for (let i in this.dataL) {
        for (let x in this.dataL[i]) {
          if (this.dataL[i][x].dataListaL == dataInicioFormat) {
            this.refListaData.push(this.dataL[i][x]);
            this.liderOne = this.dataL[i][x].liderDia;
          }
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
img {
  max-width: 70% !important;
  padding: 0;
}

#foto-header {
  max-width: 45% !important;
  padding: 0;
}

#lista-alunos {
  max-width: 100%;
  align-items: center;
  font-size: 10pt;
  color: var(--gray);
  transition: 0.45s;
  background-color: white;
  &.active {
    color: var(--gray);
    background-color: transparent;
  }
  &:hover {
    padding: 12px;
    border-radius: 5px;
    color: var(--gray);
    background-color: var(--gray-light);
  }
}

#lista-alunos-header {
  max-width: 100%;
  font-weight: bolder;
  padding: 10px;
  border-radius: 5px;
  font-size: 12pt;
  background-color: #faac58;
  color: var(--gray);
}

.lista-alunos-item {
  padding: 12px;
}

#id {
  max-width: 70% !important;
}

.modal-header {
  background-color: aliceblue;
}
</style>

