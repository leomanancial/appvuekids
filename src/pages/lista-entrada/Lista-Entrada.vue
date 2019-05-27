<template>
  <form>
    <h1>Busca Aluno</h1>
    <hr>
    <div class="form-inline">
      <div class="form-group mx-sm-3 mb-2">
        <input
          type="text"
          class="form-control"
          style="min-width:400px"
          placeholder="Nome da criança ou código"
        >
      </div>
      <button type="button" class="btn btn-primary mb-2" @click="busca()">
        <i class="fas fa-search"></i> Buscar
      </button>
    </div>
    <hr>
    <template>
      <div>
        <BuscaAluno></BuscaAluno>
      </div>
    </template>
  </form>
</template>

<script>
import BuscaAluno from "./../../components/layout/BuscaAluno";

export default {
  components: {
    BuscaAluno
  },

};
</script>

<style>
</style>
