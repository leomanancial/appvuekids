<template>
  <form>
    <div>
      <h1>Novo Aluno</h1>
      <hr>
    </div>
    <div class="container-fluid">
      <div class="form-group row">
        <div class="col-2">
          <img v-bind:src="myPic" style="border:none">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-2">
          <input
            disabled
            class="form-control"
            type="text"
            placeholder="código"
            id="codigo-input"
            v-model="form.id"
          >
        </div>
        <div class="col-6">
          <input
            class="form-control"
            type="text"
            placeholder="Nome da criança"
            id="nome-input"
            v-model="form.nome"
          >
        </div>

        <div class="col-4">
          <input
            class="form-control"
            type="date"
            placeholder="Data Nascimento"
            id="nascimento-input"
            v-model="form.nascimento"
          >
        </div>
      </div>
      <div class="form-group row">
        <div class="col-5">
          <input
            class="form-control"
            type="text"
            placeholder="Pais ou Responsável"
            id="resp-input"
            v-model="form.resp"
          >
        </div>

        <div class="col-4">
          <input
            class="form-control"
            type="tel"
            placeholder="Telefone"
            id="telefone-input"
            v-model="form.tel"
          >
        </div>

        <div class="col-3">
          <select class="custom-select" id="inlineFormCustomSelect" v-model="form.sala">
            <option selected>Sala</option>
            <option value="Amarela">Amarela</option>
            <option value="Verde">Verde</option>
            <option value="Azul">Azul</option>
          </select>
        </div>
      </div>
    </div>

    <div class="form-inline mx-sm-3">
      <button class="btn btn-success mb-4" @click.prevent="submit">
        <i class="fas fa-user-plus"></i> Salvar
      </button>
    </div>
<div
        class="modal fade bd-example-modal-sm"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
        v-bind="modal"
      >
        <div class="modal-dialog modal-sm">
          <div class="modal-content">Dados Salvos</div>
        </div>
      </div>
  </form>
</template>


<script>
import Image from "../../static/avatar.png";

export default {
  name: "NovoAluno",
  data: () => {
    return {
      myPic: Image,
      form: {
        id: "",
        nome: "",
        nascimento: "",
        resp: "",
        tel: "",
        sala: ""
      }
    };
  },

  created() {},

  methods: {
    modal() {
      $("#myModal").modal("show");
    },
    submit() {
      this.$root.$emit("Spinner::show");
      const ref = this.$firebase.database().ref("ListaAlunos");
      if (!this.form.id) {
        this.form.id = ref.push().key;
      }

      ref.child(this.form.id).update(this.form, err => {
        this.$root.$emit("Spinner::hide");
        //Mostra Spinner
        if (err) {
          console.error(err);
        } else {
          alert("Dados salvos");
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

hr {
  margin-top: 0;
  margin-bottom: 0;
}

.btn-success {
  margin-right: 10px;
}
</style>
