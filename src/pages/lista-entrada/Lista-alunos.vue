<template>
  <div class="container-fluid" id="lista-aluno-tab">
    <h1>Lista de Alunos</h1>
    <div class="  p-3 mb-2  row" id="lista-alunos-header">
      <div class="col-1">Foto</div>
      <div class="col-2">Matricula</div>
      <div class="col-3">Nome</div>
      <div class="col-3">Responsável</div>
      <div class="col-2">Nascimento</div>
      <div class="col-1">Ação</div>
    </div>
    <div class="lista-alunos-item row" v-for="item in alunoss" id="lista-alunos">
      <td class="col-1 foto">
        <img v-bind:src="item.foto" class="rounded-circle">
      </td>
      <td class="col-2">{{item.id}}</td>
      <td class="col-3">{{item.nome}}</td>
      <td class="col-3">{{item.resp}}</td>
      <td class="col-2">{{item.nascimento}}</td>

      <td class="col-1">
        <button class="btn btn-secondary" @click="mostraID(item.id)">Editar</button>
      </td>
    </div>

    <div>
      <h1>Atualização de dados</h1>
      <div>
        <input type="text" name="nome" placeholder="nome" v-model="form.nome">
      </div>
      <div>
        <input type="text" name="nome" placeholder="responsavel" v-model="form.resp">
      </div>
      <div>
        <input type="Date" name="nome" v-model="form.nascimento">
      </div>
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
      nome: "",
      resp: "",
      nascimento: ""
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
                "Dados do aluno com a matricula " +
                  iD +
                  " alterado com sucesso!"
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
  max-width: 70% !important;
  padding: 0;
}

#lista-alunos {
  font-size: 15pt;
  color: var(--gray);
  transition: 0.45s;
  &.active {
    color: var(--gray);
    background-color: transparent;
  }
  &:hover {
    color: var(--white);
    background-color: var(--blue-soft);
  }
}

#lista-alunos-header{
  font-size: 18pt;
  background-color: var(--gray-soft);
  color: var(--gray);
}

.lista-alunos-item {
  padding: 10px;
}


</style>
