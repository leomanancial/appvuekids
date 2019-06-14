<template>
  <div class="container-fluid">
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

export default {
  name: "Lista-presenca",
  components: {
    BuscaAluno
  },
  data: () => {
    return {
      info: "",
      API_URL: "",
      addresses: [],
      addressSearch: "",
      selectedAddress: null
    };
  },
  created() {
    console.log("oi");
    axios
      .get("https://kidsappvue.firebaseio.com/ListaAlunos.json")
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
        // Errorscconso
      });
  },
  methods: {}
};
</script>

<style>
</style>
