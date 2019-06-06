<template>
  <div class="container-fluid" id="lista-aluno-tab">
    <h1>Lista de Alunos</h1>
    <div class="p-3 mb-2 row" id="lista-alunos-header">
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

      <!--  <td class="col-1">
        <button class="btn btn-secondary" @click="showModal(item.id)">Detalhes</button>
      </td>-->

      <!-- Button trigger modal -->
      <button class="btn btn-warning" @click="showModal=true">Editar</button>

      <!-- Modal -->
      <div
        class="modal fade"
        :class="{show: showModal}"
        :style="{display: showModal ? 'block' : 'none'}"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title">Alterar aluno</h1>
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
                <!--  <div class="form-group col-3">
                  <input
                    ref="input"
                    type="file"
                    class="d-none"
                    accept="image/*"
                    @change="handleFile($event)"
                  >
                  <button
                    @click.prevent="openFileDialog"
                    type="button"
                    class="btn btn-outline-secondary"
                  >Enviar Foto</button>
                </div>-->
                <div class="form-group col-9">
                  <div v-if="form.foto">
                    {{form.foto.name}}
                    <button @click="form.foto = ''" class="btn badge badge-light">
                      <i class="fa fa-trash text-danger"></i>
                    </button>
                  </div>
                </div>

                <div class="form-group col-4">
                  <input class="form-control" type="text" v-model="item.id" disabled>
                  <small id="emailHelp" class="form-text text-muted">Matricula</small>
                </div>
                <div class="form-group col-8">
                  <input
                    class="form-control"
                    type="text"
                    v-model="item.nome"
                    required
                  >
                  <small id="emailHelp" class="form-text text-muted">Nome da criança completo</small>
                </div>
                <div class="form-group col-4">
                  <input class="form-control" type="date" v-model="item.nascimento" required>
                  <small id="emailHelp" class="form-text text-muted">Data de nascimento</small>
                </div>
                <div class="form-group col-8">
                  <input
                    class="form-control"
                    type="text"
                    v-model="item.resp"
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
                    v-model="item.tel"
                    required
                  >
                  <small id="emailHelp" class="form-text text-muted">Telefone para contato</small>
                </div>
                <div class="form-group col-8">
                  <select class="custom-select" v-model="item.sala" required>
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
              <button type="button" class="btn btn-success">Salvar</button>
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

    <!-- <div>
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
    </div>-->
  </div>
</template>
<script>
export default {
  name: "ListaAlunos",
  created: function() {
    this.getData();
  },

  data: () => ({
    showModal: false,
    alunoss: [],
    form: {
      nome: "",
      resp: "",
      nascimento: ""
    }
  }),

  methods: {
    closeModal() {
      this.showModal = false;
    },
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

#lista-alunos-header {
  font-size: 18pt;
  background-color: var(--gray-soft);
  color: var(--gray);
}

.lista-alunos-item {
  padding: 10px;
}
</style>
