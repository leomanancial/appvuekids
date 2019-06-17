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
      <hr>
      <div class="row">
        <div class="form-group">
          <input class="form-control" type="text" placeholder="Responsável do dia">
        </div>
        <div>
          <input class="form-control" type="text" placeholder="Observações">
        </div>
        <div>
          <input class="form-control" type="date" placeholder="Data">
        </div>
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
          <td>
            <input type="text" placeholder="cartão" v-model="form.cartao">
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
    console.log(this.listaPresenca);

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
    },
    addLista() {}
  }
};
</script>

<style scoped lang="scss">
img {
  max-width: 20% !important;
  padding: 0 !important;
}
</style>
