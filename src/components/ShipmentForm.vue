<template>
  <section class="ShipmentForm">
    <h1 class="text-h6">
      <v-icon size="x-small" icon="fas fa-map" class="mr-2 text-black" /> Insira o destino e o peso
    </h1>
    <form>
      <div class="inputGroup">
        <label>Destino</label>
        <v-select
          variant="solo"
          label="Selecione o destino"
          :items="[
            'São Paulo',
            'Belo Horizonte',
            'Curitiba',
            'Fortaleza',
            'Campinas',
            'Natal',
            'Manaus',
            'Salvador',
            'Rio de Janeiro',
            'Recife'
          ]"
        ></v-select>
      </div>

      <div class="inputGroup">
        <label>Peso</label>
        <v-text-field label="Peso da carga em Kg" variant="solo"></v-text-field>
      </div>
      <v-row class="mt-1" justify="center">
        <v-btn variant="flat" color="cyan-lighten-1"> Analisar </v-btn></v-row
      >
    </form>
  </section>
</template>

<script setup lang="ts"></script>
<style>
.ShipmentForm {
  width: 420px;
  height: -webkit-fill-available;
  background-color: rgb(230, 230, 230);
  padding: 40px;
  border-radius: 15px;
}
.ShipmentForm > h1 {
  font-size: 1.5em;
  margin-bottom: 20px;
}
.ShipmentForm .inputGroup {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.inputGroup > input,
select {
  height: 45px;
  border-radius: 5px;
  outline: none;
  border: 1px solid rgb(200, 200, 200);
  padding: 0 15px;
}
</style>
