<template>
  <form @submit.prevent="submit()">
    <button class="btn btn-info" @click="mostraModal" id="btn-novo-aluno">
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
            <div class="form-group">
              <img v-bind:src="myPic" style="border:none" />
            </div>
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

          <div class="modal-body" id="MyModal">
            <div class="row">
              <div class="form-group col-3">
                <input
                  ref="input"
                  type="file"
                  class="d-none"
                  accept="image/*"
                  @change="handleFile($event)"
                />
                <button
                  @click="openFileDialog"
                  type="button"
                  class="btn btn-outline-secondary"
                >Enviar Foto</button>
              </div>
              <div class="form-group col-9">
                <div v-if="form.foto">
                  {{form.foto.name}}
                  <button @click="form.foto = ''" class="btn badge badge-light">
                    <i class="fa fa-trash text-danger"></i>
                  </button>
                </div>
              </div>

              <div class="form-group col-8">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Nome"
                  v-model="form.nome"
                  required
                />
                <small id="emailHelp" class="form-text text-muted">Nome da criança completo</small>
              </div>
              <div class="form-group col-4">
                <input class="form-control" type="date" v-model="form.nascimento" required />
                <small id="emailHelp" class="form-text text-muted">Data de nascimento</small>
              </div>
              <div class="form-group col-8">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Responsável"
                  v-model="form.resp"
                  required
                />
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
                />
                <small id="emailHelp" class="form-text text-muted">Telefone para contato</small>
              </div>
              <!--  <div class="form-group col-8">
                <input type="text" class="form-control" v-bind="this.salaShow" disabled />
                <!--select class="custom-select" v-model="form.sala" required>
                  <option value="2 e 3">2 e 3 anos</option>
                  <option value="4">4 anos</option>
                  <option value="5 e 6">5 e 6 anos</option>
                  <option value="7 e 8">7 e 8 anos</option>
                  <option value="9 e 10">9 e 10 anos</option>
                  <option value="11 e 12">11 e 12 anos</option>
                </select
                <small id="emailHelp" class="form-text text-muted">Sala que a criança está</small>
              </div>-->
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Fechar</button>
            <button class="btn btn-primary">Salvar</button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal-backdrop fade"
      :style="{display: showModal ? 'block' : 'none'}"
      :class="{show: showModal}"
    ></div>
  </form>
</template>

<script>
import LogoKids from "../../static/avatar.png";
import moment from "moment";
import { defaultCoreCipherList } from "constants";

export default {
  data: () => ({
    showModal: false,
    myPic: LogoKids,
    value: "",
    url: "",
    salaShow: "",
    form: {
      id: "",
      foto: "",
      nome: "",
      nascimento: "",
      resp: "",
      tel: "",
      sala: "",
      idade: ""
    }
  }),
  methods: {
    mostraModal() {
      this.showModal = true;
      this.form.nome = null;
      this.form.resp = null;
      this.form.nascimento = null;
      this.form.tel = null;
      this.form.sala = null;
      //console.log("Limpou");
    },

    openFileDialog() {
      this.$refs.input.value = null;
      this.$refs.input.click();
    },
    handleFile({ target }) {
      this.form.foto = target.files[0];
    },

    closeModal() {
      this.showModal = false;
    },
    async submit() {
      this.$root.$emit("Spinner::show");
      const ref = this.$firebase.database().ref("ListaAlunos");
      //Gerador ID
      var str = this.form.nome;
      var strDT = this.form.nascimento;
      const NewID = str.substring(0, 4) + strDT.substring(5);
      /////////
      this.form.id = NewID;
      if (!this.form.id) {
        this.form.id = ref.push().key;
      } else {
        this.form.id;
      }
      if (this.form.nascimento) {
        //const data = new Date();
        const dataHoje = moment().format("YYYY/MM/DD");
        const x = moment(this.form.nascimento).format("YYYY/MM/DD");
        this.form.idade = moment(dataHoje).diff(x, "year");
        console.log(this.form.idade);
      }
      //this.form.idade = dataHoje;

      console.log(this.form.idade);
      switch (this.form.idade) {
        case 2:
          this.form.sala = "2 e 3 anos";
          break;
        
        case 3:
          this.form.sala = "2 e 3 anos";
          break;
        case 4:
          this.form.sala = "4 anos";
          break;

        case 5:
          this.form.sala = "5 e 6 anos";
          break;

        case 6:
          this.form.sala = "5 e 6 anos";
          break;

        case 7:
          this.form.sala = "7 e 8 anos";
          break;

        case 8:
          this.form.sala = "7 e 8 anos";
          break;

        case 9:
          this.form.sala = "9 e 10 anos";
          break;

        case 10:
          this.form.sala = "9 e 10 anos";
          break;

        case 11:
          this.form.sala = "11 e 12 anos";
          break;

        case 12:
          this.form.sala = "11 e 12 anos";
          break;
      }

      if (this.form.foto) {
        const snapshot = await this.$firebase
          .storage()
          .ref("FotoAlunos")
          .child(this.form.id)
          .put(this.form.foto);

        const url = await snapshot.ref.getDownloadURL();

        this.form.foto = url;
      }
      //Validação de Idade, se for maior que 12 não permite gravar
      if (this.form.idade > 12) {
        this.$root.$emit("Alerta::show", {
          type: "danger",
          message:
            "Não foi possível realizar o cadastro, criança tem " +
            this.form.idade +
            " anos. Informe os Pais ou o Responsável."
        });
        this.closeModal();
        this.$root.$emit("Spinner::hide");
      } else {
        ref.child(this.form.id).update(this.form, err => {
          //Mostra Spinner
          if (err) {
            this.$root.$emit("Alerta::show", {
              type: "danger",
              message: "Não foi possível realizar o cadastro, tente novamente"
            });
          } else {
            this.$root.$emit("Alerta::show", {
              type: "success",
              message:
                "Cadastro realizado com sucesso! -  A criança: " +
                this.form.nome +
                " está na sala: " +
                this.form.sala
            });
            this.closeModal();
            this.$root.$emit("Spinner::hide");
          }
        });
      }
    }
  }
};
</script>

<style scoped>
img {
  padding: 0px;
  margin-top: 15px;
  margin-bottom: -20px;
  border-style: groove;
}

.modal-header {
  background: aliceblue !important;
  max-height: 170px;
  margin-top: -20px;
  padding-top: 10 !important;
}

.modal-title {
  padding-top: 50px;
  margin-left: 50px;
}
.modal-content {
  width: 130% !important;
}

#icon-trash {
  font-size: 12px !important;
}
</style>

