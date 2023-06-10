<template>
  <div class="BestTransport">
    <h1 class="BestTransport_title">
      Estas são as melhores alternativas de frete para <b>{{ destination }}</b> que encontramos para
      você.
    </h1>
    <section class="BestTransport_options">
      <article class="BestTransport_options-option">
        <span><v-icon size="x-large" icon="fas fa-hand-holding-dollar" /></span>
        <div>
          <h2>Frete com menor valor</h2>
          <p>Transportadora: XXXXXXX LTDA</p>
          <p>Tempo estimado: YYYYYYY</p>
        </div>
      </article>
      <article class="BestTransport_options-option">
        <div>
          <h2>Preço</h2>
          <p>{{ priceFormated }}</p>
        </div>
      </article>
      <article class="BestTransport_options-option">
        <span><v-icon size="x-large" icon="fa-solid fa-clock-rotate-left" /></span>
        <div>
          <h2>Frete mais rápido</h2>
          <p>Transportadora: XXXXXXX LTDA</p>
          <p>Tempo estimado: YYYYYYY</p>
        </div>
      </article>
      <article class="BestTransport_options-option">
        <div>
          <h2>Preço</h2>
          <p>{{ priceFormated }}</p>
        </div>
      </article>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  components: {},
  props: ['destination'],
  data() {
    const appName = ''
    const price = 1250
    const priceFormated = price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    return {
      appName,
      priceFormated
    }
  },
  created() {
    // Implemente aqui o GET dos dados da API REST
    // para que isso ocorra na inicialização da pagina
    this.appName = 'Melhor Frete'
  },
  methods: {
    // Implemente aqui os metodos utilizados na pagina
    methodFoo() {
      console.log(this.appName)
    }
  }
})
</script>

<style scoped>
.BestTransport {
  padding: 20px;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
}
.BestTransport_title {
  font-size: 1.4em;
  font-weight: 500;
  width: 60%;
}
.BestTransport_options {
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 15px;
}
.BestTransport_options-option {
  display: flex;
  border-radius: 15px;
  background-color: rgb(225, 225, 225);
  overflow: hidden;
  gap: 15px;
}

.BestTransport_options-option > div {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
}
.BestTransport_options-option > span {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 172, 166, 0.5);
  height: 100%;
  width: 90px;
  grid-column: 1/2;
  grid-row: 1/3;
}
.BestTransport_options-option:first-child {
  background-color: rgb(240, 240, 240);
}
.BestTransport_options-option:nth-child(2) {
  background-color: rgb(240, 240, 240);
}
.BestTransport_options-option:first-child > span {
  background-color: rgba(0, 172, 166, 0.3);
}
</style>
