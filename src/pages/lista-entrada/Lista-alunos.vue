]<template>
  <div class="container-fluid">
    <h1>Lista de Alunos</h1>
    <!--div-- v-for="item in alunoss">{{item.nome}} Exemplo</!--div-->
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
        <tr v-for="item in alunoss">
          <td scope="row" class="foto">
            <img v-bind:src="item.foto" style="border:none">
          </td>
          <td>{{item.nome}}</td>
          <td>{{item.resp}}</td>
          <td>{{item.id}}</td>
          <td>
            <button class="btn btn-warning" @click="writeNewAluno">Editar</button>
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
    },
    writeNewAluno() {
      const ref = this.$firebase.database().ref("ListaAlunos");
      ref.on("value", snapshot => {
        const values = snapshot.val();
        this.alunoss = Object.keys(values).map(i => values[i]);
      });

      this.alunoss.forEach(element => {
        console.log(element);
      });
    }
  }
};
</script>
<style scoped lang="scss">
img {
  max-width: 30% !important;
}
</style>
