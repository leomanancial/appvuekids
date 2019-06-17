<template >
  <div class="container-fluid">
    <h1>Lista de Presença</h1>
    <div>
      <vue-bootstrap-typeahead
        prepend="Aluno:"
        v-model="query"
        :data="this.aluno"
        style="width:500px"
        placeholder="Nome do Aluno"
      >
        <button slot="append" class="btn btn-info btn-sm" @click.prevent="addAluno(query)">Adicionar</button>
      </vue-bootstrap-typeahead>
    </div>
    <hr>
    <div class="row">
      <div class="form-group col-4">
        <select class="custom-select" v-model="form.sala" required>
          <option value="Fabio e Erica">Fabio e Érica</option>
          <option value="Fernando e Bete">Fernando e Bete</option>
          <option value="Janilson e Fabi">Janilson e Fabi</option>
          <option value="Samuel e Jéssica">Samuel e Jéssica</option>
          <option value="Vagner e Rita">Vagner e Rita</option>
        </select>
        <small id="emailHelp" class="form-text text-muted">Líder do dia</small>
      </div>
      <div class="form-group col-6">
        <input class="form-control" type="textbox" placeholder="Observação">
        <small id="emailHelp" class="form-text text-muted">Digite alguma observação</small>
      </div>
      <div class="form-group col-2">
        <input class="form-control" type="text" v-model="this.dataLista" disabled>
        <small id="emailHelp" class="form-text text-muted">Data da Lista</small>
      </div>
    </div>

    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Código</th>
          <th scope="col">Nome</th>
          <th scope="col">Responsável</th>
          <th scope="col">Cartão</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in this.listaPresenca">
          <td v-if="item.fotoL">
            <img v-bind:src="item.fotoL" class="rounded-circle">
          </td>
          <td>{{item.nomeL}}</td>
          <td>{{item.responsavelL}}</td>
          <td class="form-group">
            <input type="text" placeholder="cartão" v-model="form.cartao" required>
          </td>
          <td>
            <button class="btn btn-warning">Editar</button>
          </td>
          <td>
            <button class="btn btn-danger">Excluir</button>
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
      query: "",
      selectedUser: null,
      alunoss: [],
      aluno: [],
      form: {
        fotoL: "",
        nomeL: "",
        responsavelL: "",
        idL: "",
        cartaoL: ""
      },
      listaPresenca: [],
      liderDia: "",
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
      //Adiciona a lista para o autocomplete
      for (var a in values) {
        this.aluno.push(values[a].nome);
      }
    });
  },

  methods: {
    addAluno(q) {
      console.log("oi");

      for (var b in this.alunoss) {
        if (q == this.alunoss[b].nome) {
          this.form.fotoL = this.alunoss[b].foto;
          this.form.nomeL = this.alunoss[b].nome;
          this.form.responsavelL = this.alunoss[b].resp;
          this.form.idL = this.alunoss[b].id;
          this.form.cartaoL = "";
        } else {
          console.log("não tem");
        }
      }
      this.listaPresenca.push(this.form);

      const ref = this.$firebase.database().ref("ListaPresenca");
      for (var i in listaPresenca) {
        ref.child(this.form.idL).set({
          /*  dataLista: this.data,
        liderDia: this.lider, */
          foto: this.listaPresenca[i].foto,
          nome: this.listaPresenca[i].nome,
          resp: this.listaPresenca[i].resp,
          id: this.listaPresenca[i].id
          /* cartao: this.form.cartaoL */
        });
      }
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
