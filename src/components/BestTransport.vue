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
          <p>{{ cheapestShipping.cost_transport }}</p>
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
          <p>{{ fasterShipping.cost_transport }}</p>
        </div>
      </article>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
interface ShippingType {
  id: number
  name: string
  cost_transport: string
  city: string
  lead_time: string
}
interface ResponseType {
  id: number
  name: string
  cost_transport_light: string
  cost_transport_heavy: string
  city: string
  lead_time: string
}
const ShippingDefault: ShippingType = {
  id: 1,
  name: '',
  cost_transport: '',
  city: '',
  lead_time: ''
}
export default defineComponent({
  components: {},
  watch: {
    destination: function () {
      this.getData()
    },
    weight: function () {
      this.getCheapestShipping()
      this.getFasterShipping()
    }
  },
  props: {
    destination: String,
    weight: Number
  },
  data() {
    return {
      cheapestShipping: ShippingDefault,
      fasterShipping: ShippingDefault,
      data: [] as ResponseType[] | null
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.data
    this.cheapestShipping
    this.fasterShipping
  },
  methods: {
    // Implemente aqui os metodos utilizados na pagina
    isHeavy() {
      let heavy = true
      if (!this.weight) return
      if (this.weight > 100) {
        return heavy
      }
      heavy = false
      return heavy
    },
    getCheapestShipping() {
      if (!this.data) return
      let atual_cost_transport = this.isHeavy()
        ? this.data[0].cost_transport_heavy
        : this.data[0].cost_transport_light
      this.cheapestShipping = {
        ...this.data[0],
        cost_transport: atual_cost_transport
      }
      for (let i = 1; i < this.data.length; i++) {
        atual_cost_transport = this.isHeavy()
          ? this.data[i].cost_transport_heavy
          : this.data[i].cost_transport_light

        if (
          this.formatToNumber(this.cheapestShipping.cost_transport) >
          this.formatToNumber(atual_cost_transport)
        ) {
          this.cheapestShipping = {
            ...this.data[i],
            cost_transport: atual_cost_transport
          }
        }
      }
      console.log(this.cheapestShipping)
    },
    formatToNumber(text: String) {
      return Number(text.replace(/[^0-9.-]+/g, ''))
    },
    getFasterShipping() {
      if (!this.data) return
      let atual_cost_transport = this.isHeavy()
        ? this.data[0].cost_transport_heavy
        : this.data[0].cost_transport_light
      this.fasterShipping = {
        ...this.data[0],
        cost_transport: atual_cost_transport
      }
      for (let i = 1; i < this.data.length; i++) {
        atual_cost_transport = this.isHeavy()
          ? this.data[i].cost_transport_heavy
          : this.data[i].cost_transport_light

        if (
          this.formatToNumber(this.fasterShipping.lead_time) >
          this.formatToNumber(this.data[i].lead_time)
        ) {
          this.fasterShipping = {
            ...this.data[i],
            cost_transport: atual_cost_transport
          }
        }
      }
    },
    async getData() {
      try {
        const res = await axios.get(`http://localhost:3000/transport?city=${this.destination}`)
        this.data = res.data
        this.getCheapestShipping()
        this.getFasterShipping()
      } catch (err) {
        console.log(err)
      }
    }
  }
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
