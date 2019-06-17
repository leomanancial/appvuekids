<template >
  <div class="container-fluid">
    <h1>Lista de Presença</h1>
    <div>
      <vue-bootstrap-typeahead
        prepend="Aluno:"
        v-model="query"
        :data="this.aluno"
        style="width:500px"
        placeholder="Nome do Aluno"
      >
        <button
          type="button"
          slot="append"
          class="btn btn-info btn-sm"
          @click.prevent="addAluno(query)"
        >Adicionar</button>
      </vue-bootstrap-typeahead>
    </div>
    <hr>
    <div class="row">
      <div class="form-group col-4">
        <select class="custom-select" v-model="liderDia" required>
          <option value="Fabio e Erica">Fabio e Érica</option>
          <option value="Fernando e Bete">Fernando e Bete</option>
          <option value="Janilson e Fabi">Janilson e Fabi</option>
          <option value="Samuel e Jéssica">Samuel e Jéssica</option>
          <option value="Vagner e Rita">Vagner e Rita</option>
        </select>
        <small id="emailHelp" class="form-text text-muted">Líder do dia</small>
      </div>
      <div class="form-group col-6">
        <input class="form-control" type="textbox" placeholder="Observação">
        <small id="emailHelp" class="form-text text-muted">Digite alguma observação</small>
      </div>
      <div class="form-group col-2">
        <input class="form-control" type="text" v-model="this.dataLista" disabled>
        <small id="emailHelp" class="form-text text-muted">Data da Lista</small>
      </div>
    </div>

    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Foto</th>
          <th scope="col">Nome</th>
          <th scope="col">Responsável</th>
          <th scope="col">Sala</th>
          <th scope="col">Cartão</th>
          <th scope="col">Ação</th>
          <th scope=""></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in this.listaPresenca">
          <td v-if="item.foto">
            <img v-bind:src="item.foto" class="rounded-circle">
          </td>
          <td>{{item.nome}}</td>
          <td>{{item.resp}}</td>
          <td>{{item.sala}}</td>
          <td class="form-group">
            <input type="text" placeholder="cartão" v-model="form.cartao" disabled>
          </td>
          <td>
            <button class="btn btn-danger">Remover</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import BuscaAluno from "./../../components/layout/BuscaAluno";
import axios from "axios";
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
import Stringify from "vue-stringify";

export default {
  name: "Lista-presenca",
  components: {
    BuscaAluno,
    VueBootstrapTypeahead,
    Stringify
  },
  data: () => {
    return {
      query: "",
      selectedUser: null,
      alunoss: [],
      aluno: [],
      form: {
        fotoL: "",
        nomeL: "",
        responsavelL: "",
        idL: "",
        cartaoL: ""
      },
      listaPresenca: [],
      liderDia: "",
      dataLista: ""
    };
  },
  created() {
    const data = new Date();
    this.dataLista =
      data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear();

    const ref = this.$firebase.database().ref("ListaAlunos");
    ref.on("value", snapshot => {
      const values = snapshot.val();
      this.alunoss = Object.keys(values).map(i => values[i]);

      for (var s in this.alunoss) {
        console.log(this.alunoss[s]);
        this.aluno.push(this.alunoss[s].nome);
      }
    });
  },

  methods: {
    addAluno(q) {
      for (var b in this.alunoss) {
        if (q == this.alunoss[b].nome) {
          this.listaPresenca.push(this.alunoss[b]);

          console.log(this.listaPresenca);
        } else {
          console.log("não tem");
        }
      }
      const ref = this.$firebase.database().ref("ListaPresenca");
      ref.child(this.listaPresenca).update(this.listaPresenca, err => {
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
      });
    }
  }
};
</script>

<style scoped lang="scss">
img {
  max-width: 20% !important;
  padding: 0 !important;
}
</style>
