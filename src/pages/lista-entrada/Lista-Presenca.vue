<template >
  <div class="container-fluid">
    <h1>Busca Aluno</h1>
    <!--busca-aluno/-->
    <div>
      <div>
        <vue-bootstrap-typeahead
          v-model="query"
          :data="this.aluno"
          style="width:500px"
          placeholder="Nome do Aluno ou Responsável"
        />
        <br>
      </div>
      <p class="lead">
        Selecionado:
        <strong>{{query[0]}}</strong>
      </p>
    </div>
    <div>
      <button class="btn btn-info btn-sm" @click.prevent="addAluno(query)">Editar</button>
    </div>

    <hr>
    <h1>Lista de Presença</h1>
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
        <tr>
          <th scope="row">1</th>
          <td>Arthur</td>
          <td>Leonardo</td>
          <td>153</td>
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
      listaPresenca: {
        nome: '',
      }
    };
  },
  created() {
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
      console.log(q);
    }
  }
};
</script>

<style>
</style>
