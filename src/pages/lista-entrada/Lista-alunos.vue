]<template>
  <div class="container-fluid">
    <h1>Lista de Alunos</h1>
    <div v-for="item in alunoss">{{item.nome}}</div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Foto</th>
          <th scope="col">Nome</th>
          <th scope="col">Responsável</th>
          <th scope="col">Matrícula</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td scope="row" class="foto">
            <img v-bind:src="this.alunoss[0].foto" style="border:none">
          </td>
          <td scope="row">{{this.alunoss[0].nome}}</td>
          <td scope="row">{{this.alunoss[0].resp}}</td>
          <td scope="row">{{this.alunoss[0].id}}</td>
          <td scope="row">
            <button class="btn btn-warning">Editar</button>
          </td>
          <td scope="row">
            <button class="btn btn-danger">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ListaAlunos",

/*   props: {
    data: { type: Object, required: true }
  },
 */
  created: function() {
    this.getData();
  },

  data: () => ({
    alunoss: []
  }),

  methods: {
    async getData() {
      const ref = this.$firebase.database().ref("ListaAlunos");
      ref.on("value", snapshot => {
        const values = snapshot.val();
        this.alunoss = Object.keys(values).map(i => values[i]);
      });
      /*   ref.on("value", function(snapshot) {
        //console.log(snapshot.val());
        this.alunoss = snapshot.val();
      }); */
    }
  }
};
</script>
<style scoped lang="scss">
img {
  max-width: 30% !important;
}
</style>
