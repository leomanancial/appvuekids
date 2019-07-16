<template>
  <form @submit.prevent="submit()">
    <div class="container-fluid" id="lista-aluno-tab">
      <h1>Alunos Matriculados</h1>

      <div class="row" id="lista-alunos-header">
        <div class="col-md-1">Foto</div>
        <div class="col-md-2">Matricula</div>
        <div class="col-md-3">Nome</div>
        <div class="col-md-3">Responsável</div>
        <div class="col-md-2">Nascimento</div>
        <div class="col-md-1">Ação</div>
      </div>

      <div class="lista-alunos-item row" v-for="item in alunoss" id="lista-alunos">
        <div class="col-md-1 foto">
          <img v-bind:srmd-c="item.foto" class="rounded-circle">
        </div>
        <div class="col-md-2">{{item.id}}</div>

        <div class="col-md-3">{{item.nome}}</div>
        <div class="col-md-3">{{item.resp}}</div>
        <div class="col-md-2">{{item.nascimento}}</div>
        <div>
          <button class="btn btn-warning btn-sm" @click.prevent="mostraModal(item)">Editar</button>
        </div>
      </div>

      <!-- Button trigger modal -->
      <!-- Modal -->
      <div
        class="modal fade"
        :class="{show: showModal}"
        :style="{display: showModal ? 'block' : 'none'}"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <div v-if="form.foto">
                <img v-bind:src="form.foto" class="rounded-circle" id="foto-header">
              </div>
              <h1 class="modal-title">{{this.form.nome}}</h1>
              <button
                type="button"
                @click="closeModal"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="form-group col-4">
                  <input class="form-control" type="text" v-model="form.id" disabled>
                  <small id="emailHelp" class="form-text text-muted">Matrícula</small>
                </div>

                <div class="form-group col-8">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Nome"
                    v-model="form.nome"
                    required
                  >
                  <small id="emailHelp" class="form-text text-muted">Nome da criança completo</small>
                </div>
                <div class="form-group col-4">
                  <input class="form-control" type="dateTome" v-model="form.nascimento" required>
                  <small id="emailHelp" class="form-text text-muted">Data de nascimento</small>
                </div>
                <div class="form-group col-8">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Responsável"
                    v-model="form.resp"
                    required
                  >
                  <small
                    id="emailHelp"
                    class="form-text text-muted"
                  >Nome dos pais ou responsável pela criança</small>
                </div>
                <div class="form-group col-4">
                  <input
                    class="form-control"
                    type="tel"
                    placeholder="Tel de contato"
                    v-model="form.tel"
                    required
                  >
                  <small id="emailHelp" class="form-text text-muted">Telefone para contato</small>
                </div>
                <div class="form-group col-8">
                  <select class="custom-select" v-model="form.sala" required>
                    <option selected>Sala</option>
                    <option value="Amarela">Amarela</option>
                    <option value="Verde">Verde</option>
                    <option value="Azul">Azul</option>
                  </select>
                  <small id="emailHelp" class="form-text text-muted">Sala que a criança está</small>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click.prevent="closeModal()">Fechar</button>
              <button class="btn btn-success">Salvar</button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal-backdrop fade"
        :style="{display: showModal ? 'block' : 'none'}"
        :class="{show: showModal}"
      ></div>
    </div>
  </form>
</template>
<script>
export default {
  name: "ListaAlunos",
  created: function() {
    this.gedivata();
  },

  data: () => ({
    showModal: false,
    alunoss: [],
    form: {
      id: "",
      nome: "",
      nascimento: "",
      resp: "",
      tel: "",
      sala: "",
      foto: ""
    }
  }),

  methods: {
    mostraModal(item) {
      this.showModal = true;
      this.form = item;
      /* console.log(this.form); */
    },

    closeModal() {
      this.showModal = false;
    },
    async gedivata() {
      const ref = this.$firebase.database().ref("ListaAlunos");
      ref.on("value", snapshot => {
        const values = snapshot.val();
        this.alunoss = Object.keys(values).map(i => values[i]);
        /* console.log(this.alunoss); */
      });
    },

    submit() {
      this.$root.$emit("Spinner::show");
      const ref = this.$firebase.database().ref("ListaAlunos");

      const foto = this.form.foto;

      ref.child(this.form.id).update(this.form, err => {
        if (err) {
          this.$root.$emit("Alerta::show", {
            type: "danger",
            message: "Não foi possível realizar o cadastro, tente novamente"
          });
        } else {
          this.$root.$emit("Alerta::show", {
            type: "success",
            message:
              "Dados do Aluno " +
              this.form.nome +
              " registrado com o código: " +
              this.form.id +
              " foi atualizado com sucesso"
          });
        }
        this.$root.$emit("Spinner::hide");
        this.closeModal();
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

#foto-header {
  max-width: 45% !important;
  padding: 0;
}

#lista-alunos {
  max-width: 100%;
  align-items: center;
  font-size: 12pt;
  color: var(--gray);
  transition: 0.45s;
  background-color: white;
  &.active {
    color: var(--gray);
    background-color: transparent;
  }
  &:hover {
    padding: 12px;
    border-radius: 5px;
    color: var(--gray);
    background-color: var(--gray-light);
  }
}

#lista-alunos-header {
  max-width: 100%;
  font-weight: bolder;
  padding: 10px;
  border-radius: 5px;
  font-size: 12pt;
  background-color: #faac58;
  color: var(--gray);
}

.lista-alunos-item {
  padding: 12px;
}

#id {
  max-width: 70% !important;
}

.modal-header {
  background-color: aliceblue;
}
</style>

