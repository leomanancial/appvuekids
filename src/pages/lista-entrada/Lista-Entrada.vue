<template>
  <div class="container-fluid">
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
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>
            <button class="btn btn-warning">Editar</button>
          </td>
          <td>
            <button class="btn btn-danger">Excluir</button>
          </td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td>
            <button class="btn btn-warning">Editar</button>
          </td>
          <td>
            <button class="btn btn-danger">Excluir</button>
          </td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
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

export default {
  components: {
    BuscaAluno
  }
};
</script>

<style>
</style>
