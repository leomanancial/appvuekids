<template>
  <div class="container-fluid">
    <h1>Listas Salvas</h1>
    <div class="row">
      <div class="form-group col-3">
        <input class="form-control" type="date" v-model="dataInicio" />
        <small id="emailHelp" class="form-text text-muted">Data para pesquisa</small>
      </div>

      <div class="form-group col-2">
        <!--small id="emailHelp" class="form-text text-muted">Pesquisa por data</small-->
        <button class="btn btn-info" @click.prevent="busca">Pesquisar</button>
      </div>

      <div class="form-group col-5">
        <vue-bootstrap-typeahead
          prepend="Aluno:"
          v-model="pesquisaNome"
          :data="this.query"
          placeholder="Nome do Aluno"
        ></vue-bootstrap-typeahead>
        <small id="emailHelp" class="form-text text-muted">Nome do Aluno</small>
      </div>
      <div class="form-group col-2">
        <!--small id="emailHelp" class="form-text text-muted">Pesquisa por nome</small-->
        <button class="btn btn-info" @click.prevent="buscaAluno">Pesquisar</button>
      </div>
    </div>
    <div>
      <h2 v-if="this.liderOne?this.liderOne:'' ">Lider do Dia: {{this.liderOne+" - "}} Data: {{this.dataDaLista}}</h2>
    </div>
    <div class="row" id="lista-alunos-header">
      <div class="col-1">Foto</div>
      <div class="col-2">Nome</div>
      <div class="col-2">Responsável</div>
      <div class="col-2">Sala</div>
      <div class="col-3">Observação</div>
      <div class="col-2">Cartão</div>
    </div>
    <hr />
    <div id="teste">
      <div v-for="item in this.refListaData" class="lista-alunos-item row" id="lista-alunos">
        <div class="col-1 foto">
          <img v-bind:src="item.fotoL?item.fotoL:myPic" class="rounded-circle" />
        </div>
        <div class="col-2">{{item.nomeL}}</div>
        <div class="col-2">{{item.respDiaL}}</div>
        <div class="col-2">{{item.salaL}}</div>
        <div class="col-3">{{item.observacao}}</div>
        <div class="col-2" id="cartao">{{item.cartao}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import groupby from "lodash.groupby";
import Avatar from "../../static/kids3.png";
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";

export default {
  name: "Listas-Salvas",
  data: () => {
    return {
      myPic: Avatar,
      a: [],
      b: [],
      pesquisaNome: "",
      refListaData: [],
      refListaPresenca: [],
      dataInicio: "",
      dataFinal: "",
      dataHoje: "",
      mostraLista: false,
      compara: "",
      liderDoDia: "",
      dataL: [],
      vazia: [],
      liderOne: "",
      query: [],
      dataDaLista: ""
    };
  },

  created() {
    this.dataHoje = moment(data).format("DD-MM-YYYY");
    const data = new Date();
    /*  new Intl.DateTimeFormat("en-US").format(this.dataBusca); */
    //this.dataHoje = new Intl.DateTimeFormat("en-US").format(data);
    const ref = this.$firebase.database().ref("ListaAlunos");
    ref.on("value", snapshot => {
      const values = snapshot.val();
      this.refListaPresenca = Object.keys(values).map(i => values[i]);
      for (let j in values) {
        this.query.push(values[j].nome);
      }
    });
  },

  methods: {
    busca() {
      this.refListaData = [];
      this.liderOne = "";
      const dataInicioFormat = moment(this.dataInicio).format("DD-MM-YYYY");
      const dataFinalFormat = moment(this.dataFinal).format("DD/MM/YYYY");
      const ref = this.$firebase.database().ref("ListaPresenca");

      ref.on("value", snapshot => {
        const values = snapshot.val();
        for (let i in values) {
          if (i == dataInicioFormat) {
            let c = values[i];
            this.vazia = c;
            this.$root.$emit("Alerta::show", {
              type: "success",
              message: "Lista de alunos presentes no dia: " + dataInicioFormat
            });
          } else {
            this.$root.$emit("Alerta::show", {
              type: "danger",
              message:
                "Não existe registros para essa data. Insira uma data válida e tente novamente!"
            });
          }
          this.$root.$emit("Spinner::hide");
        }
        this.dataL = groupby(this.vazia, "dataListaL");
      });

      for (let i in this.dataL) {
        for (let x in this.dataL[i]) {
          if (this.dataL[i][x].dataInicioFormatL == dataInicioFormat) {
            this.refListaData.push(this.dataL[i][x]);
            this.liderOne = this.dataL[i][x].liderDia;
            this.dataDaLista = this.dataL[i][x].dataInicioFormatL;
          }
        }
      }
    },

    buscaAluno() {
      this.refListaData = [];
      this.liderOne = "";
      const dataInicioFormat = moment(this.dataInicio).format("DD-MM-YYYY");
      const dataFinalFormat = moment(this.dataFinal).format("DD/MM/YYYY");
      const ref = this.$firebase.database().ref("ListaPresenca");

      ref.on("value", snapshot => {
        const values = snapshot.val();
        for (let i in values) {
          if (i == dataInicioFormat) {
            let c = values[i];
            this.vazia = c;
            console.log(this.vazia);
          }
        }
        this.dataL = groupby(this.vazia, "dataListaL");
      });

      for (let i in this.dataL) {
        for (let x in this.dataL[i]) {
          if (
            this.dataL[i][x].nomeL == this.pesquisaNome &&
            this.dataL[i][x].dataInicioFormatL == dataInicioFormat
          ) {
            this.refListaData.push(this.dataL[i][x]);
            this.liderOne = this.dataL[i][x].liderDia;
            this.$root.$emit("Alerta::show", {
              type: "success",
              message:
                "Aluno: " +
                this.dataL[i][x].nomeL +
                " - " +
                "Cartão: " +
                this.dataL[i][x].cartao
            });
          } else {
            /*this.$root.$emit("Alerta::show", {
              type: "danger",
              message:
                "Não localizado esse Aluno, verifique se o nome esta correto e tente novamente ou verifique a data"
            });*/
          }
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
#teste {
  height: calc(100vh - 260px);
  overflow: hidden auto;
  width: calc(100% + 15px);
}
img {
  max-width: 70% !important;
  padding: 0;
}

#foto-header {
  max-width: 45% !important;
  padding: 0;
}

#lista-alunos {
  //max-width: 100%;
  -webkit-box-align: center;
  padding: 0;
  margin-bottom: 5px;
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
    //padding: 12px;
    //border-radius: 5px;
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
  margin: 0;
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

#cartao {
  background-color: var(--blue-light-plus);
  padding-top: 15px;
  padding-bottom: 15px;
  max-width: 100px;
  text-align: center;
  border-radius: 25px;
  font-weight: bold;
  font-size: 15px;
  color: white;
}
</style>

