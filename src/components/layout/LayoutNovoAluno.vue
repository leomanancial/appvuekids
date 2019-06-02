<template>
  <div>
    <button class="btn btn-md bt-outline-primary w-75" @click="showModal=true">
      <i class="fas fa-user-plus"></i>
      Novo Aluno
    </button>

    <div
      class="modal fade"
      :class="{show: showModal}"
      :style="{display: showModal ? 'block' : 'none'}"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title">Novo Aluno</h1>
            <button
              type="button"
              @click="closeModal"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span>×</span>
            </button>
          </div>
          <div class="modal-body">
            <img v-bind:src="myPic" style="border:none">
            <input type="text" placeholder="Nome completo" v-model="form.nome" required>
            <input type="datetime" v-model="form.nascimento" required>
            <input type="text" placeholder="Pais ou Responsável" v-model="form.resp" required>
            <input type="tel" placeholder="Tel de contato" v-model="form.tel" required>
            <select class="custom-select" v-model="form.sala" required>
              <option selected>Sala</option>
              <option value="Amarela">Amarela</option>
              <option value="Verde">Verde</option>
              <option value="Azul">Azul</option>
            </select>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Fechar</button>
            <button type="button" class="btn btn-primary" @click.prevent="submit()">Salvar</button>
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
import Foto from "../../static/avatar.png";
export default {
  data: () => ({
    showModal: false,
    myPic: Foto,
    form: {
      id: "",
      nome: "",
      nascimento: "",
      resp: "",
      tel: "",
      sala: ""
    }
  }),
  methods: {
    closeModal() {
      this.showModal = false;
    },

    submit() {
      this.$root.$emit("Spinner::show");
      const ref = this.$firebase.database().ref("ListaAlunos");
      //Gerador ID
      var str = this.form.nome;
      var strDT = this.form.nascimento;
      const NewID = str.substring(0, 4) + strDT.substring(0, 6);
      /////////
      this.form.id = NewID;
      if (!this.form.id) {
        this.form.id = ref.push().key;
      } else {
        this.form.id;
      }

      ref.child(this.form.id).update(this.form, err => {
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
          this.closeModal();
        }
      });
    }
  }
};
</script>

<style>
img {
  padding: 20px;
  border-style: groove;
}
</style>

