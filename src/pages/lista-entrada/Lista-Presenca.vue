<template >
  <div class="container-fluid">
    <h1>Lista de Presença</h1>
    <form>
      <div class="row">
        <div class="form-group col-4">
          <small id="emailHelp" class="form-text text-muted">Líder do dia</small>
          <select class="custom-select" v-model="form.liderDia" required>
            <option value="Fabio e Erica">Fabio e Érica</option>
            <option value="Fernando e Bete">Fernando e Bete</option>
            <option value="Janilson e Fabi">Janilson e Fabi</option>
            <option value="Samuel e Jéssica">Samuel e Jéssica</option>
            <option value="Vagner e Rita">Vagner e Rita</option>
          </select>
        </div>
        <div class="form-group col-6">
          <small id="emailHelp" class="form-text text-muted">Digite alguma observação</small>
          <input class="form-control" v-model="form.obs" type="textbox" placeholder="Observação">
        </div>
        <div class="form-group col-2">
          <small id="emailHelp" class="form-text text-muted">Data da Lista</small>
          <input class="form-control" type="text" v-model="this.dataLista" disabled>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="form-group col-6">
          <vue-bootstrap-typeahead
            prepend="Aluno:"
            v-model="query"
            :data="this.aluno"
            style="max-width:500px"
            placeholder="Nome do Aluno"
          ></vue-bootstrap-typeahead>
        </div>
        <div class="form-group col-4">
          <input
            class="form-control"
            type="text"
            placeholder="Digite o número do cartão"
            v-model="form.cartao"
            required
          >
        </div>
        <div class="form-group col-2">
          <button type="button" class="btn btn-info" @click.prevent="addAluno(query)">Adicionar</button>
        </div>
      </div>
    </form>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Foto</th>
          <th scope="col">Nome</th>
          <th scope="col">Responsável</th>
          <th scope="col">Sala</th>
          <th scope="col">Cartão</th>
          <th scope="col">Ação</th>
          <th scope></th>
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
          <td>{{form.cartaoL}}</td>
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
        nome: "",
        responsavel: "",
        idL: "",
        cartao: "",
        obs: "",
        liderDia: "",
        dataListaL: ""
      },
      listaPresenca: [],
      refListaPresenca: [],
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
        //console.log(this.alunoss[s]);
        this.aluno.push(this.alunoss[s].nome);
      }
    });
    const ref2 = this.$firebase.database().ref("ListaPresenca");
    ref2.on("value", snapshot => {
      const values = snapshot.val();
      this.refListaPresenca = Object.keys(values).map(i => values[i]);
    });
    console.log(this.refListaPresenca);
  },

  methods: {
    addAluno(q) {
      for (var b in this.alunoss) {
        if (q == this.alunoss[b].nome) {
          this.listaPresenca.push(this.alunoss[b]);

          this.form.idL = this.alunoss[b].id;
          this.form.nome = this.alunoss[b].nome;
          this.form.responsavel = this.alunoss[b].resp;
          this.form.dataListaL = this.dataLista;

          //console.log(this.form);
          //console.log(this.listaPresenca);
        } else {
          console.log("não tem");
        }
      }
      const ref = this.$firebase.database().ref("ListaPresenca");

      ref.child(this.form.idL).update(this.form, err => {
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

      /* for (var a in this.form) {
        console.log(this.form[a]);
      } */
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
