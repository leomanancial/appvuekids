<template>
  <nav class="nav d-flex justify-content-around">
    <div>
      <router-link
        exact
        :key="i"
        exact-active-class="active"
        class="nav-link"
        :to="{ name: router.name }"
        v-for="(router, i) in routerLinks"
      >
        <i class="fa" :class=" `fa-${router.meta.icon}`"></i>
        {{ router.meta.title}}
      </router-link>
    </div>
    <div>
      <layout-logout/>
    </div>
  </nav>
</template>

<script>
import LayoutLogout from "./LayoutLogout";

export default {
  components: {
    LayoutLogout
  },

  computed: {
    routerLinks() {
      return this.$router.options.routes.filter(r => r.name !== "login");
    }
  }
};
</script>

<style scoped lang="scss">
.nav {
  margin-left: -15px;
  width: calc(100% + 30px);
  height: calc(100vh-49px);
  .nav-link {
    color: var(--white);
    transition: 0.45s;
    &.active {
      color: var(--gray);
      background-color: transparent;
    }
    &:hover {
      color: var(--white);
      background-color: var(--gray);
    }
  }
}
</style>
