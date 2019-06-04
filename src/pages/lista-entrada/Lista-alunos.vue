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
            <button class="btn btn-warning" @click="mostraID(item.id)">Editar</button>
          </td>
          <td scope="row">
            <button class="btn btn-danger">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <input type="text" name="nome" v-model="form.nome">
    </div>
  </div>
</template>
<script>
export default {
  name: "ListaAlunos",
  created: function() {
    this.getData();
  },

  data: () => ({
    alunoss: [],
    form: {
      nome: ""
    }
  }),

  methods: {
    async getData() {
      const ref = this.$firebase.database().ref("ListaAlunos");
      ref.on("value", snapshot => {
        const values = snapshot.val();
        this.alunoss = Object.keys(values).map(i => values[i]);
      });
    },

    mostraID(iD) {
      const ref = this.$firebase.database().ref("ListaAlunos");
      ref.on("value", snapshot => {
        const values = snapshot.val();
        this.alunoss = Object.keys(values).map(i => values[i]);
      });

      this.alunoss.forEach(element => {
        if (iD == element.id) {
          ref.child(iD).update(this.form, err => {
            //Mostra Spinner
            if (err) {
              console.error(err);
            } else {
              this.$root.$emit("Spinner::hide");
              alert(
                "Aluno " +
                  this.form.nome +
                  " registrado com o código: " +
                  this.form.id
              );
            }
          });
        }
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
