<template>
<form>
  <h1>Busca Aluno</h1>
  <hr />

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
    alunoss: []
  }),
  created() {
    this.getData();
  },

  methods: {
    getData() {
      this.$firebase
        .firestore()
        .doc("ListaGeral/Alunos")
        .get()
        .then(function(doc) {
          if (doc.exists) {
            console.log(doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("Vazio");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    }
  }
};
</script>

<style>
</style>
