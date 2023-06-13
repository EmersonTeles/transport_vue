<template>
  <section class="ShipmentForm">
    <h1 class="text-h6">
      <v-icon size="x-small" icon="fas fa-map" class="mr-2 text-black" /> Insira o destino e o peso
    </h1>
    <v-form @submit.prevent>
      <div class="inputGroup">
        <label>Destino</label>
        <v-select
          variant="solo"
          label="Selecione o destino"
          v-model="destination"
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
        <v-text-field
          v-model="weight"
          :rules="rules"
          label="Peso da carga em Kg"
          variant="solo"
        ></v-text-field>
      </div>
      <v-row class="mt-1" justify="center">
        <v-btn
          width="160"
          height="30"
          type="submit"
          variant="flat"
          color="cyan-lighten-1"
          @click="submit"
        >
          Analisar
        </v-btn></v-row
      >
    </v-form>
  </section>
  <v-dialog v-model="dialogError" width="auto">
    <v-card class="pa-3">
      <v-row class="ma-2" justify="center">
        <v-icon class="xx-large" icon="fa:fas fa-circle-exclamation" />
      </v-row>
      <v-card-text class="text-h5"> Insira os valores para realizar a análise. </v-card-text>
      <v-card-actions>
        <v-row justify="center">
          <v-btn
            width="160"
            height="30"
            type="submit"
            variant="flat"
            color="cyan-lighten-1"
            @click="dialogError = false"
            >Fechar</v-btn
          >
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ShipmentForm',
  emits: ['formSubmited'],
  methods: {
    submit() {
      if (this.destination == '' || this.weight == '') {
        this.dialogError = true
        return
      }
      if (!/^[0-9]+$/g.test(this.weight)) return
      this.$emit('formSubmited', this.destination, this.weight)
    },
    verifyInput(weight: string) {
      if (/^[0-9]+$/g.test(weight)) return true

      return 'Por favor, insira apenas números.'
    }
  },
  data() {
    return {
      destination: '',
      weight: '',
      timeout: undefined,
      dialogError: false,
      rules: [(weight: string) => this.verifyInput(weight)]
    }
  },
  components: {}
})
</script>
<style>
.ShipmentForm {
  max-width: 400px;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  background-color: rgb(230, 230, 230);
  padding: 40px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.ShipmentForm > h1 {
  font-size: 1.5em;
  margin-bottom: 20px;
}
.ShipmentForm .inputGroup {
  display: flex;
  flex-direction: column;
}
.inputGroup > input,
select {
  height: 45px;
  border-radius: 5px;
  outline: none;
  border: 1px solid rgb(200, 200, 200);
  padding: 0 15px;
}
@media (max-width: 1000px) {
  .ShipmentForm {
    max-width: 300px;
    padding: 20px;
  }
}
</style>
