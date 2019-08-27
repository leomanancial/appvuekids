<template></template>

<script>
export default {
  created() {
    this.gedivata();
    console.log( this.gedivata());
  },
  methods: {
    async gedivata() {
      const ref = this.$firebase.database().ref("ListaAlunos");
      ref.on("value", snapshot => {
        const values = snapshot.val();
        this.alunoss = Object.keys(values).map(i => values[i]);
      });
    }
  }
};
</script>

<style>
</style>
