<template>
  <form>
    <h1>Novo Aluno</h1>
    <hr>

    <div class="container-fluid">
      <picture class="form-group mx-sm-3 mb-3">
        <div>
          <img alt="Dashboard" src="/src/pages/novo-aluno/avatar.png" title="Dashboard">
        </div>
      </picture>
      <div class="form-group row">
        <div class="col-2">
          <input
            class="form-control"
            type="text"
            placeholder
            id="codigo-input"
            disabled
            v-model="form.codigo"
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
          <select class="custom-select" id="inlineFormCustomSelect">
            <option selected>Sala</option>
            <option value="1">Amarela</option>
            <option value="2">Verde</option>
            <option value="3">Azul</option>
          </select>
        </div>
      </div>
    </div>

    <div class="form-inline mx-sm-3">
      <button type="submit" class="btn btn-success mb-4">
        <i class="fas fa-user-plus"></i> Salvar
      </button>
      <div>
        <button type="button" class="btn btn-warning mb-4">
          <i class="fas fa-user-edit"></i> Atualizar
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "NovoAluno",
  data: () => ({
    form: {
      codigo: "",
      nome: "",
      nascimento: "",
      resp: "",
      tel: "",
      sala: ""
    }
  }),

  created() {
    var size = 2; //qtde de digitos
    var randomized = Math.ceil(Math.random() * Math.pow(10, size));
    var digito = Math.ceil(Math.log(randomized));
    while (digito > 10) {
      digito = Math.ceil(Math.log(digito));
    }
    var rId = randomized + digito;

    const ref = this.$firebase.database().ref("ListaAlunos");
    //const id = ref.push().key;
    const id = rId;

    /*  const id = rId;
    const ref = this.$firebase.firestore();
  */

    const registro = {
      id,
      dt_registro: new Date().getDate(),
      aluno: "Mauro",
      dt_nasc: "12/12/2312",
      responsavel: "Me",
      sala: "Amarela"
    };

    ref.child(id).set(registro);
    /*
    ref
      .collection("Lista")
      .doc("test")
      .set(registro)
      .then(function() {
        console.log("Document successfully written!");
      }); */
  },

  methods: {
    submit() {}
  }
};
</script>

<style>
img {
  padding: 50px;
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
