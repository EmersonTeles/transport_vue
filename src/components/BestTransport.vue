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
          <p>Transportadora: {{ cheapestShipping.name }}</p>
          <p>Tempo estimado: {{ cheapestShipping.lead_time }}</p>
        </div>
      </article>
      <article class="BestTransport_options-option">
        <div>
          <h2>Preço</h2>
          <p>
            {{
              cheapestShipping.cost_transport.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })
            }}
          </p>
        </div>
      </article>
      <article class="BestTransport_options-option">
        <span><v-icon size="x-large" icon="fa-solid fa-clock-rotate-left" /></span>
        <div>
          <h2>Frete mais rápido</h2>
          <p>Transportadora: {{ fasterShipping.name }}</p>
          <p>Tempo estimado: {{ fasterShipping.lead_time }}</p>
        </div>
      </article>
      <article class="BestTransport_options-option">
        <div>
          <h2>Preço</h2>
          <p>
            {{
              fasterShipping.cost_transport.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })
            }}
          </p>
        </div>
      </article>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { type ShippingType } from '@/types/ShippingType'

const ShippingDefault: ShippingType = {
  id: 0,
  name: '',
  cost_transport: 0,
  city: '',
  lead_time: ''
}
export default defineComponent({
  components: {},
  props: {
    destination: { type: String, default: '' },
    fasterShipping: { type: Object, default: ShippingDefault },
    cheapestShipping: { type: Object, default: ShippingDefault }
  },
  data() {
    return {}
  },
  methods: {}
})
</script>

<style scoped>
.BestTransport {
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
}
.BestTransport_title {
  font-size: 1.4em;
  font-weight: 500;
  width: 76%;
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
.BestTransport_options-option > div > h2 {
  font-size: 1.4em;
}
.BestTransport_options-option > span {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 172, 166, 0.5);
  height: 100%;
  max-width: 90px;
  width: -webkit-fill-available;
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

@media (max-width: 1000px) {
  .BestTransport_title {
    width: 100%;
  }
  .BestTransport_options-option {
    gap: 5px;
  }
  .BestTransport_options-option > div {
    padding: 5px 10px;
  }
  .BestTransport_options-option > span {
    max-width: 70px;
    width: -webkit-fill-available;
  }
  .BestTransport_options-option > div > h2 {
    font-size: 1.2em;
  }
}
</style>
