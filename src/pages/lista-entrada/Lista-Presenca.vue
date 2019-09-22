<template >
  <div class="container-fluid">
    <h1>Lista de Presença</h1>
    <form @submit.prevent="addAluno(query)">
      <h2>Líderes do dia: {{ this.form.liderDia ? this.form.liderDia : "Nenhum registro" }}</h2>
      <div class="row">
        <div class="form-group col-md-5" required>
          <vue-bootstrap-typeahead
            prepend="Aluno:"
            v-model="query"
            :data="this.aluno"
            placeholder="Nome do Aluno"
          ></vue-bootstrap-typeahead>
        </div>
        <div class="form-group col-md-2">
          <input
            class="form-control"
            type="text"
            placeholder="Cartão"
            v-model="form.cartao"
            required
          />
        </div>

        <div class="form-group col-md-5">
          <input
            class="form-control"
            v-model="form.respDiaL"
            type="textbox"
            placeholder="Pai, Mãe ou responsável"
            required
          />
        </div>

        <div class="form-group col-md-5">
          <input
            class="form-control"
            v-model="form.obs"
            type="textbox"
            placeholder="Observação sobre o aluno"
          />
        </div>

        <div class="form-group col-md">
          <button class="btn btn-success" style="text-align: -webkit-left; width: 135px">
            <i class="fas fa-plus"></i> Salvar
          </button>
        </div>

        <div class="form-group col-md-5">
          <novo-aluno />
        </div>
      </div>
    </form>
    <hr />
    <h2>Diário Escolar {{this.dataLista}}</h2>
    <div class="form-group">
      <textarea
        class="form-control"
        v-model="diario"
        rows="7"
        placeholder="Registre informações importantes sobre o dia de hoje"
        style="width:100%"
      ></textarea>
    </div>
    <div class="form-group">
      <button @click="addDiario" class="btn btn-success">
        <i class="fas fa-plus"></i> Salvar
      </button>
    </div>
  </div>
</template>

<script>
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
import moment from "moment";
import groupby from "lodash.groupby";
import NovoAluno from "../../components/layout/NovoAluno";

export default {
  name: "Lista-presenca",
  components: {
    NovoAluno,
    VueBootstrapTypeahead
  },
  data: () => {
    return {
      visible: true,
      query: "",
      diario: "",
      selectedUser: null,
      alunoss: [],
      aluno: [],
      idade: [],
      email: "",
      form: {
        fotoL: "",
        nomeL: "",
        respDiaL: "",
        idL: "",
        liderDia: "",
        cartao: "",
        obs: "",
        dataListaL: "",
        salaL: "",
        listaID: ""
      },
      listaPresenca: [],
      refListaPresenca: [],
      listasalva: [],
      dataLista: "",
      dataL: [],
      mostraLider: [],
      vazia: [],
      countSala: [],
      nmSala: []
    };
  },
  created() {

    //console.log(nomeInicio);
    let user = this.$firebase.auth().currentUser;
    let nomeInicio = user.email.split("@");
    this.email = nomeInicio[0];
    if (user.email != null) {
      //console.log(user.email);

      switch (user.email) {
        ///////////////////////// Fabio e Erica
        case "fabio@kids.com.br": //faberi2019
          this.form.liderDia = "Fabio e Erica";
          break;

        case "erica@kids.com.br": //erifab2019
          this.form.liderDia = "Fabio e Erica";
          break;
        //////////////////////// Fernando e Bete
        case "fernando@kids.com.br": // ferbet2019
          this.form.liderDia = "Fernando e Bete";
          break;

        case "bete@kids.com.br": // betfer2019
          this.form.liderDia = "Fernando e Bete";
          break;
        /////////////////////// Janilson e Fabi
        case "janilson@kids.com.br": // janfab2019
          this.form.liderDia = "Janilson e Fabi";
          break;

        case "fabi@kids.com.br": // fabjan2019
          this.form.liderDia = "Janilson e Fabi";
          break;
        /////////////////////// Samuel e Jessica
        case "jessica@kids.com.br": // jessam2019
          this.form.liderDia = "Samuel e Jessica";
          break;

        case "samuel@kids.com.br": // 123Mudar
          this.form.liderDia = "Samuel e Jessica";
          break;
        /////////////////////// Vagner e Rita
        case "vagner@kids.com.br": // vagrit2019
          this.form.liderDia = "Vagner e Rita";
          break;

        case "rita@kids.com.br": // ritvag2019
          this.form.liderDia = "Vagner e Rita";
          break;
        /////////////////////// Admin
        case "admin@admin.com.br":
          this.form.liderDia = "Admin";
          break;

        default:
          this.form.liderDia = "Adminstrador";
          break;
      }
    }
    const data = new Date();
    const dataInicioFormat = moment(this.dataInicio).format("DD-MM-YYYY");
    const dataHoje = moment(this.data).format("DD-MM-YYYY");
    //const dataHoje = new Intl.DateTimeFormat("pt-BR").format(data);
    this.dataLista = dataHoje;
    //Teste não excluir

    /* var teste = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
    this.dataLista = this.dataLista = new Intl.DateTimeFormat("pt-BR").format(teste); */

    const ref = this.$firebase.database().ref("ListaAlunos");

    ref.on("value", snapshot => {
      const values = snapshot.val();
      this.alunoss = Object.keys(values).map(i => values[i]);

      for (var s in this.alunoss) {
        this.aluno.push(this.alunoss[s].nome);
      }
    });

    //Lista exibida embaixo da busca
    const ref2 = this.$firebase.database().ref("ListaPresenca");
    ref2.on("value", snapshot => {
      const values = snapshot.val();
      for (let i in values) {
        if (i == dataInicioFormat) {
          for (let j in values[i]) {
            this.nmSala.push(values[i][j].salaL);
            let novaArr = this.nmSala.filter(
              (este, i) => this.nmSala.indexOf(este) === i
            );
            this.countSala = novaArr;
          }
        }
      }
    });
  },

  methods: {
    closeModal() {
      this.bloqueioLider = true;
    },

    addDiario() {
      console.log(this.email);
      const dataInicioFormat = moment(this.dataInicio).format("DD-MM-YYYY");
      const diarioLog = moment().format("HH:mm:ss");
      const ref = this.$firebase
        .database()
        .ref(
          "ListaPresenca/" +
            dataInicioFormat +
            " - Diario Escolar - " +
            diarioLog +
            " - registrado por: " +
            this.email
        )
        .set(this.diario, err => {
          if (err) {
            this.$root.$emit("Alerta::show", {
              type: "danger",
              message: "Diário não foi atualizado, tente novamente"
            });
          } else {
            this.$root.$emit("Alerta::show", {
              type: "success",
              message: "Diário escolar atualizado. "
            });
          }
          this.$root.$emit("Spinner::hide");
        });
    },

    addAluno(q) {
      //Gerador ID
      var strDT = this.form.nascimento;
      const ListaID =
        "cod-" + this.form.liderDia.substring(0, 4) + "-" + this.dataLista;
      /////////
      const dataInicioFormat = moment(this.dataInicio).format("DD-MM-YYYY");

      for (var b in this.alunoss) {
        if (q == this.alunoss[b].nome) {
          this.listaPresenca = {
            fotoL: this.alunoss[b].foto,
            idL: this.alunoss[b].id,
            nomeL: this.alunoss[b].nome,
            respDiaL: this.form.respDiaL,
            dataListaL: this.dataLista,
            salaL: this.alunoss[b].sala,
            listaID: ListaID,
            dataInicioFormatL: dataInicioFormat,
            cartao: this.form.cartao,
            observacao: this.form.obs,
            liderDia: this.form.liderDia
          };
        } else {
          //console.log("não tem");
        }
      }
      const timestamp = moment(this.dataInicio).format("DD-MM-YYYY");
      this.listasalva.push(this.listaPresenca);
      const ref = this.$firebase
        .database()
        .ref("ListaPresenca/" + dataInicioFormat + "/" + this.listaPresenca.idL)
        .set(this.listaPresenca, err => {
          if (err !== null) {
            this.$root.$emit("Alerta::show", {
              type: "danger",
              message: "Não foi possível realizar o cadastro, tente novamente"
            });
          } else {
            this.$root.$emit("Alerta::show", {
              type: "success",
              message:
                this.listaPresenca.nomeL +
                " - Sala: " +
                this.listaPresenca.salaL
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
  max-width: 70% !important;
  padding: 0 !important;
}
#lista-alunos-header {
  max-width: 100%;
  font-weight: bolder;
  padding: 10px;
  border-radius: 5px;
  font-size: 12pt;
  background-color: #faac58;
  color: var(--gray);
  margin: 0;
}

#foto-header {
  max-width: 45% !important;
  padding: 0;
}
#lista-alunos {
  padding: 5px;
  margin-top: 5px;
  margin-bottom: 10px;
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
    padding: 5px !important;
    border-radius: 5px;
    color: var(--gray);
    background-color: var(--gray-light);
  }
  .lista-alunos-item {
    padding: 12px !important;
  }
}
</style>
