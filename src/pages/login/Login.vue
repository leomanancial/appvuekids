<template>
  <form @submit.prevent="dologin()" class="form-login">
    <div class="card">
      <div class="card-header text-center">
        <h1 class="mb-0">Kids App</h1>
      </div>
      <div class="card-body">
        <div class="form-group">
          <input
            type="email"
            v-model="email"
            class="form-control"
            placeholder="Digite seu Email"
            required
          >
        </div>
        <div class="form-group">
          <input
            type="password"
            v-model="password"
            class="form-control"
            placeholder="Digite sua Senha"
            required
          >
        </div>
        <button class="btn btn-primary btn-block">
          Entrar
          <i class="fa fa-sign-in-alt"></i>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import firebase from "firebase/app";
export default {
  name: "Login",
  data: () => {
    return {
      email: "",
      password: ""
    };
  },

  methods: {
    // Metodos Async espera algo acontecer no caso o Await
    async dologin() {
      const { email, password } = this;
      try {
        const res = await this.$firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        //Se usuario esta logado Rediciona após para a home
        window.uid = res.user.uid;
        this.$router.push({ name: "home" });
      } catch (err) {
        console.log(err);
      }
    }
  },

  beforeRouterEnter(to, from, next) {
    next(vm => {
      if (window.uid) {
        vm.$router.push({ name: "home" });
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.form-login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .card {
    width: 30%;
    color: var(--white);
  }
  .card-header {
    background: var(--blue-light-plus);
  }
  h1 {
    font-size: 20pt;
  }
}
</style>
