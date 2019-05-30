<template>
  <form>
    <h1>Novo Aluno</h1>
    <hr>
    <div class="container-fluid">
      <picture class="form-group mx-sm-3 mb-4">
        <img src="/src/static/avatar.png"  alt="Foto">
      </picture>

      <div class="form-group row">
        <div class="col-10">
          <input class="form-control" type="text" placeholder="Nome" id="example-text-input">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-10">
          <input class="form-control" type="text" placeholder="Idade" id="example-text-input">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-10">
          <input class="form-control" type="text" placeholder="Telefone" id="example-text-input">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-10">
          <select class="custom-select" id="inlineFormCustomSelect">
            <option selected>Sala</option>
            <option value="1">Amarela</option>
            <option value="2">Verde</option>
            <option value="3">Azul</option>
          </select>
        </div>
      </div>
    </div>
    <hr>
    <div class="form-group mx-sm-3 mb-2">
      <button type="button" class="btn btn-primary mb-2">
        <i class="fas fa-user-plus"></i> Salvar
      </button>
    </div>
  </form>
</template>

<script>
export default {};
</script>

<style>
img {
  padding: 50px;
  margin-left: 0;
  margin: 10px;
  border-style: groove;
}
</style>
