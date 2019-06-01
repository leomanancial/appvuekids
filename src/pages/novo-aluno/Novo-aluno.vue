<template>
  <form class="container-fluid" id="MyForm">
    <h1>Novo Aluno</h1>
    <hr>
    <div class="container-fluid">
      <div class="form-group row">
        <div class="col-2">
          <img v-bind:src="myPic" style="border:none">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-2">
          <input
            class="form-control"
            disabled
            type="text"
            placeholder="código"
            id="codigo-input"
            v-model="form.id"
          >
        </div>
        <div class="col-6">
          <input
            required
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
            required
            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
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
            required
            type="text"
            placeholder="Pais ou Responsável"
            id="resp-input"
            v-model="form.resp"
          >
        </div>

        <div class="col-4">
          <input
            class="form-control"
            required
            type="tel"
            placeholder="Telefone"
            id="telefone-input"
            v-model="form.tel"
          >
        </div>

        <div class="col-3">
          <select class="custom-select" v-model="form.sala" required>
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

      <button type="button" class="btn btn-warning mb-4" @click.prevent="clean">
        <i class="fas fa-user-edit"></i> Limpar
      </button>
    </div>

    <div class="modal fade show" style="padding-right: 15px; display: block;">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLiveLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Woohoo, you're reading this text in a modal!</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
      <div class="modal-backdrop fade show"></div>
  </form>
</template>


<script>
import Foto from "../../static/avatar.png";
import ModalAluno from "./../../components/modal/ModalAluno";
import { setInterval } from "timers";

export default {
  name: "NovoAluno",
  data: () => {
    return {
      myPic: Foto,
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

  methods: {
    clean() {
      document.getElementById("MyForm").reset();
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
          //Limmpa o formulario
          setTimeout(function() {
            document.getElementById("MyForm").reset();
          }, 5000);
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
