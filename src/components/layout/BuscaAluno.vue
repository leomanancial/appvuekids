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
      <div></div>
      <button type="button" class="btn btn-primary mb-2" @click="busca()">
        <i class="fas fa-search"></i> Buscar
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "Lista",
  data: () => ({
  }),
  created() {
    this.getData();
  },

  methods: {
    getData() {
      /* const ref = this.$firebase.database().ref("ListaAlunos");
      ref.on("value", function(snapshot) {
        //console.log(snapshot.val());
      }); */
    }
  }
};
</script>

<style>
</style>
