<template>
  <h1>Lista de Alunos</h1>
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
