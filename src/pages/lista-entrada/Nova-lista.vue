<template>
  <form>
    <template>
      <div>
        <BuscaAluno></BuscaAluno>
      </div>
    </template>
    <hr />
  <h1>Lista de Entrada</h1>
    <template>
      <Lista-Entrada></Lista-Entrada>
    </template>
  </form>
</template>

<script>
import BuscaAluno from "./../../components/layout/BuscaAluno";
import ListaEntrada from "./../../pages/lista-entrada/Lista-Entrada";

export default {
  components: {
    BuscaAluno,
    ListaEntrada
  }
};
</script>

<style>
</style>
