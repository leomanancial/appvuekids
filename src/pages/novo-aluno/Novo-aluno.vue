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
          <select class="custom-select" required v-model="form.sala">
            <option selected>Sala</option>
            <option value="Amarela">Amarela</option>
            <option value="Verde">Verde</option>
            <option value="Azul">Azul</option>
          </select>
        </div>
      </div>
    </div>

    <div class="form-inline mx-sm-3">
      <button class="btn btn-success mb-4" @click="submit">
        <i class="fas fa-user-plus"></i> Salvar
      </button>
      <button type="button" class="btn btn-warning mb-4" @click="apaga">
        <i class="fas fa-user-edit"></i> Limpar
      </button>
    </div>
  </form>
</template>


<script>
import Foto from "../../static/avatar.png";

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

  created() {},

  methods: {
    apaga() {
      document.getElementById("MyForm").reset();
    },

    submit() {
      this.$root.$emit("Spinner::show");
      var size = 2;
      var randomized = Math.ceil(Math.random() * Math.pow(10, size)); //Cria um número aleatório do tamanho definido em size.
      var digito = Math.ceil(Math.log(randomized)); //Cria o dígito verificador inicial
      while (digito > 10) {
        //Pega o digito inicial e vai refinando até ele ficar menor que dez
        digito = Math.ceil(Math.log(digito));
      }
      const Rid = randomized + digito; //Cria a ID
      const ref = this.$firebase.database().ref("ListaAlunos");
      var str = this.form.nome;
      var strDT = this.form.nascimento;
      const NewID = str.substring(0, 4) + strDT.substring(0, 6);

      console.log(str.substring(0, 4) + strDT.substring(0, 5));

      this.form.id = NewID;
      if (!this.form.id) {
        this.form.id = ref.push().key;
      } else {
        this.form.id;
      }

      ref.child(this.form.id).update(this.form, err => {
        this.$root.$emit("Spinner::hide");
        //Mostra Spinner
        if (err) {
          console.error(err);
        } else {
          alert(
            "Aluno " +
              this.form.nome +
              " registrado com o código: " +
              this.form.id
          );
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
