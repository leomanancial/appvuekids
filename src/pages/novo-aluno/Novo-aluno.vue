<template>
  <form>
    <h1>Novo Aluno</h1>
    <hr />
    <div class="container-fluid">
      <picture class="form-group mx-sm-3 mb-3">
        <div>
          <img src="/public/logo_kids.png">
        </div>
      </picture>

      <div class="form-group row">
        <div class="col-10">
          <input class="form-control" type="text" placeholder="Nome" id="nome-input">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-10">
          <input
            class="form-control"
            type="date"
            placeholder="Data Nascimento"
            id="nascimento-input"
          >
        </div>
      </div>
      <div class="form-group row">
        <div class="col-10">
          <input class="form-control" type="text" placeholder="Responsável" id="resp-input">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-10">
          <input class="form-control" type="text" placeholder="Telefone" id="telefone-input">
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
    <div class="form-inline mx-sm-3">
      <button type="button" class="btn btn-success mb-4">
        <i class="fas fa-user-plus"></i> Salvar
      </button>
      <div>
        <button type="button" class="btn btn-warning mb-4">
          <i class="fas fa-user-edit"></i> Atualizar
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {};
</script>

<style>
img {
  padding: 50px;
  border-style: groove;
}

hr {
  margin-top: 0;
  margin-bottom: 0;
}

.btn-success {
  margin-right: 10px;
}
</style>
