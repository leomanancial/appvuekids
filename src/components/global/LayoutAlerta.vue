<template>
  <div v-if="show" class="alert alert-dismissible fade show" :class="`alert-${type}`">
    {{message}}
    <button type="button" class="close" @click="close()">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>

export default {
  data: () => ({
    show: false,
    message: '',
    type: 'danger'
  }),
  created() {
    this.$root.$on("Alerta::show", cadastro => {
      this.show = true;
      this.type = cadastro.type;
      this.message = cadastro.message;

      setTimeout(() => { this.close() }, cadastro.timeout || 4000)
    })
  },
  methods: {
    close() {
      this.message = "";
      this.type = "danger";
      this.show = false;
    }
  }
};
</script>

<style scoped >
.alert {
  top: 20px;
  right: 20px;
  max-width: 400px;
  z-index: 100;
  position: absolute;
}
</style>
