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
      <td>
        <button
          class="btn btn-warning btn-sm"
          @click.prevent="mostraModal(item.foto, item.nome, item.id, item.resp, item.nascimento, item.sala, item.tel )"
        >Editar</button>
      </td>
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
              <button @click="form.foto = ''" class="btn badge badge-light">
                <i class="fa fa-trash text-danger"></i>
              </button>
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
              <!--   <div class="form-group col-3">
                <input
                  ref="input"
                  type="file"
                  class="d-none"
                  accept="image/*"
                  @change="handleFile($event)"
                >
                <button
                  @click="openFileDialog"
                  type="button"
                  class="btn btn-outline-secondary"
                >Enviar Foto</button>
              </div>-->
              <div class="form-group col-9"></div>
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
                <input class="form-control" type="date" v-model="form.nascimento" required>
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
      id: "",
      foto: "",
      nome: "",
      nascimento: "",
      resp: "",
      tel: "",
      sala: ""
    }
  }),

  methods: {
    mostraModal(gFoto, gNome, gId, gResp, gNasci, gSala, gTel) {
      this.showModal = true;
      this.form.foto = gFoto;
      this.form.id = gId;
      this.form.nome = gNome;
      this.form.resp = gResp;
      this.form.nascimento = gNasci;
      this.form.sala = gSala;
      this.form.tel = gTel;

      console.log(this.form.tel);
    },

    closeModal() {
      this.showModal = false;
    },
    async getData() {
      const ref = this.$firebase.database().ref("ListaAlunos");
      ref.on("value", snapshot => {
        const values = snapshot.val();
        this.alunoss = Object.keys(values).map(i => values[i]);
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
  font-size: 12pt;
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
  font-size: 15pt;
  background-color: var(--gray-soft);
  color: var(--gray);
}

.lista-alunos-item {
  padding: 10px;
}

#id {
  max-width: 70% !important;
}
</style>
