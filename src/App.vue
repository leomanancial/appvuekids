<template>
  <div id="app">
    <layout-alerta />
    <base-spinner />
    <div class="container-fluid" v-if="isLogged">
      <div class="row">
        <div class="col-2 navigation-sidebar">
          <layout-navigation />
          <div class="logout">
            <layout-logout />
          </div>
        </div>
        <div class="col">
          <router-view />
        </div>
      </div>
    </div>
    <!--Conteudo mostrado para quem esta logado -->
    <router-view v-else />
  </div>
</template>

<script>
import BaseSpinner from "./components/global/BaseSpinner";
import LayoutNavigation from "./components/layout/LayoutNavigation";
import BuscaAluno from "./components/layout/BuscaAluno";
import NovoAluno from "./components/layout/NovoAluno";
import ListaPresenca from "./pages/lista-entrada/Lista-Presenca";
import LayoutAlerta from "./components/global/LayoutAlerta";
import LayoutLogout from "./components/layout/LayoutLogout";

export default {
  name: "App",
  components: {
    BaseSpinner,
    LayoutNavigation,
    BuscaAluno,
    NovoAluno,
    ListaPresenca,
    LayoutAlerta,
    LayoutLogout
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

      /*  // Desloga por inatividade
      if (window.uid != null) {
        setTimeout(() => {
          window.uid = null;
          this.isLogged = false;
          this.$router.push("login");
        }, 5000);
      } else {
       
      } */
    });
  }
};
</script>

<style lang="scss">
#app {
  min-height: 10vh;
  background-color: white;
  .navigation-sidebar {
    background-color: var(--blue-light-plus);
    height: 100vh;
    max-width: 15%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .app-title {
      font-size: 35pt;
      margin-top: 10px;
      text-align: center;
      color: var(--white);
    }
  }
}
</style>
