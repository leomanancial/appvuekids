<template>
  <div id="app">
    <base-spinner/>
    <div class="container-fluid" v-if="isLogged">
      <div class="row">
        <div class="col-2 navigation-sidebar">
          <h1 class="app-title">Kids App</h1>
          <layout-navigation/>
        </div>
        <div class="col">
          <router-view/>
        </div>
      </div>
    </div>
    <!--Conteudo mostrado para quem esta logado -->
    <router-view v-else/>
  </div>
</template>

<script>
import BaseSpinner from "./components/global/BaseSpinner";
import LayoutNavigation from "./components/layout/LayoutNavigation";
import BuscaAluno from "./components/layout/BuscaAluno";
import NovoAluno from "./components/layout/NovoAluno";
import ListaAlunos from "./pages/lista-entrada/Lista-alunos";



export default {
  name: "App",
  components: {
    BaseSpinner,
    LayoutNavigation,
    BuscaAluno,
    NovoAluno,
    ListaAlunos,
  },
  data: () => ({ isLogged: false }),
  mounted() {
    //Confirma se usuário esta logado, caso esteja vai para home, senão login
    this.$firebase.auth().onAuthStateChanged(user => {
      window.uid = user ? user.uid : null;
      //Oculta a coluna de links na pagina de login
      this.isLogged = !!user;
      this.$router.push({ name: window.uid ? "home" : "login" });

      setTimeout(() => {
        this.$root.$emit("Spinner::hide");
      }, 2000);
    });
  }
};
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  background-color: var(--gray-light);
  .navigation-sidebar {
    background-color: var(--blue-light-plus);
    height: 100vh;
    max-width: 15%;
    .app-title {
      font-size: 35pt;
      margin-top: 10px;
      text-align: center;
      color: var(--white);
    }
  }
}
</style>
