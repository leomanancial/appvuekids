<template >
  <div class="container-fluid">
    <h1>Lista de Presença</h1>
    <form @submit.prevent="addAluno(query)">
      <div class="row">
        <div class="form-group col-4">
          <small id="emailHelp" class="form-text text-muted">Líder do dia</small>
          <select class="custom-select" v-model="form.liderDia" required>
            <option value="Fabio e Erica">Fabio e Érica</option>
            <option value="Fernando e Bete">Fernando e Bete</option>
            <option value="Janilson e Fabi">Janilson e Fabi</option>
            <option value="Samuel e Jéssica">Samuel e Jéssica</option>
            <option value="Vagner e Rita">Vagner e Rita</option>
          </select>
        </div>
        <div class="form-group col-2">
          <small id="emailHelp" class="form-text text-muted">Data da Lista</small>
          <input class="form-control" type="text" v-model="this.dataLista" disabled>
        </div>
      </div>
      <hr>
      <h2>Líderes do dia: {{this.form.liderDia}}</h2>
      <div class="row">
        <div class="form-group col-6" required>
          <vue-bootstrap-typeahead
            prepend="Aluno:"
            v-model="query"
            :data="this.aluno"
            placeholder="Nome do Aluno"

          ></vue-bootstrap-typeahead>
        </div>

        <div class="form-group col-4">
          <input
            class="form-control"
            type="text"
            placeholder="Digite o número do cartão"
            v-model="form.cartao"
            required
          >
        </div>

        <div class="form-group col-6">
          <input class="form-control" v-model="form.obs" type="textbox" placeholder="Observação">
        </div>
        <div class="form-group col-2">
          <button class="btn btn-info">Adicionar</button>
        </div>
      </div>
    </form>

    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Foto</th>
          <th scope="col">Matricula</th>
          <th scope="col">Nome</th>
          <th scope="col">Responsável</th>
          <th scope="col">Sala</th>
          <th scope="col">Cartão</th>
          <th scope="col">Observação</th>
          <th scope="col">Ação</th>
          <th scope></th>
        </tr>
      </thead>

      <tbody v-if="visible">
        <tr v-for="item in this.refListaPresenca">
          <td v-if="item.fotoL">
            <img v-bind:src="item.fotoL" class="rounded-circle">
          </td>
          <td>{{item.idL}}</td>
          <td>{{item.nome}}</td>
          <td>{{item.responsavel}}</td>
          <td>{{item.salaL}}</td>
          <td>{{item.cartao}}</td>
          <td>{{item.obs}}</td>
          <td>
            <button class="btn btn-danger">Remover</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import BuscaAluno from "./../../components/layout/BuscaAluno";
import axios from "axios";
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
import Stringify from "vue-stringify";

export default {
  name: "Lista-presenca",
  components: {
    BuscaAluno,
    VueBootstrapTypeahead,
    Stringify
  },
  data: () => {
    return {
      visible: true,
      query: "",
      selectedUser: null,
      alunoss: [],
      aluno: [],
      form: {
        fotoL: "",
        nome: "",
        responsavel: "",
        idL: "",
        cartao: "",
        obs: "",
        liderDia: "",
        dataListaL: "",
        salaL: ""
      },
      listaPresenca: [],
      refListaPresenca: [],
      dataLista: ""
    };
  },
  created() {
    const data = new Date();
    this.dataLista =
      data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear();

    const ref = this.$firebase.database().ref("ListaAlunos");

    ref.on("value", snapshot => {
      const values = snapshot.val();
      this.alunoss = Object.keys(values).map(i => values[i]);

      for (var s in this.alunoss) {
        //console.log(this.alunoss[s]);
        this.aluno.push(this.alunoss[s].nome);
      }
    });
    const ref2 = this.$firebase.database().ref("ListaPresenca");
    ref2.on("value", snapshot => {
      const values = snapshot.val();
      this.refListaPresenca = Object.keys(values).map(i => values[i]);
    });
    //console.log(this.refListaPresenca);
  },

  methods: {
    mostraLista() {},
    addAluno(q) {
      for (var b in this.alunoss) {
        if (q == this.alunoss[b].nome) {
          this.listaPresenca.push(this.alunoss[b]);
          this.form.fotoL = this.alunoss[b].foto;
          this.form.idL = this.alunoss[b].id;
          this.form.nome = this.alunoss[b].nome;
          this.form.responsavel = this.alunoss[b].resp;
          this.form.dataListaL = this.dataLista;
          this.form.salaL = this.alunoss[b].sala;

          //console.log(this.form);
          //console.log(this.listaPresenca);
        } else {
          console.log("não tem");
        }
      }
      const ref = this.$firebase.database().ref("ListaPresenca");

      ref.child(this.form.idL).update(this.form, err => {
        if (err) {
          this.$root.$emit("Alerta::show", {
            type: "danger",
            message: "Não foi possível realizar o cadastro, tente novamente"
          });
        } else {
          this.$root.$emit("Alerta::show", {
            type: "success",
            message:
              "Aluno " +
              this.form.nome +
              " matricula: " +
              this.form.idL +
              " está presente!"
          });
        }
        this.$root.$emit("Spinner::hide");
      });

      /* for (var a in this.form) {
        console.log(this.form[a]);
      } */
    }
  }
};
</script>

<style scoped lang="scss">
img {
  max-width: 20% !important;
  padding: 0 !important;
}
</style>
