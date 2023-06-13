<template>
  <v-card class="shipmentCard">
    <v-toolbar color="cyan-lighten-1" height="60">
      <v-icon size="small" icon="fas fa-truck-fast" class="mr-4 ml-8 text-white" />
      <h1 class="text-h6 text-white">Melhor Frete</h1>
    </v-toolbar>
    <main class="content">
      <ShipmentForm @formSubmited="handleFormSubmit" />
      <BestTransport
        v-if="searchOpen"
        :destination="destination"
        :cheapestShipping="cheapestShipping"
        :fasterShipping="fasterShipping"
      />

      <div class="d-flex align-center justify-center w-100" v-else>
        <h1 class="text-h4 text-center">Nenhum dado selecionado.</h1>
      </div>
      <v-btn
        v-if="searchOpen"
        color="cyan-lighten-1"
        width="160"
        height="30"
        class="clearBtn"
        @click="clear"
        >Limpar</v-btn
      >
    </main>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ShipmentForm from './ShipmentForm.vue'
import BestTransport from './BestTransport.vue'
import axios from 'axios'
import { type ShippingType } from '@/types/ShippingType'
interface ResponseType {
  id: number
  name: string
  cost_transport_light: string
  cost_transport_heavy: string
  city: string
  lead_time: string
}
const ShippingDefault: ShippingType = {
  id: 0,
  name: '',
  cost_transport: 0,
  city: '',
  lead_time: ''
}
export default defineComponent({
  name: 'ShipmentCard',
  data() {
    return {
      destination: '',
      loading: false,
      weight: 0,
      searchOpen: false,
      cheapestShipping: ShippingDefault,
      fasterShipping: ShippingDefault,
      data: [] as ResponseType[]
    }
  },
  watch: {
    destination: function () {
      this.getData()
    },
    weight: function () {
      this.getCheapestShipping()
      this.getFasterShipping()
    }
  },
  methods: {
    async getData() {
      try {
        const res = await axios.get(`http://localhost:3000/transport?city=${this.destination}`)
        this.data = res.data
        this.getCheapestShipping()
        this.getFasterShipping()
        this.searchOpen = true
      } catch (err) {
        console.log(err)
      }
    },
    handleFormSubmit(destination: string, weight: string) {
      this.destination = destination
      this.weight = Number(weight)
      this.getData()
    },
    clear() {
      this.searchOpen = false
      this.cheapestShipping = ShippingDefault
      this.fasterShipping = ShippingDefault
    },
    isHeavy() {
      let heavy = true
      if (!this.weight) return
      if (this.weight > 100) {
        return heavy
      }
      heavy = false
      return heavy
    },
    formatToNumber(text: String) {
      return Number(text.replace(/[^0-9.-]+/g, ''))
    },
    getCheapestShipping() {
      if (!this.data) return
      if (this.data.length == 0) return
      let atual_cost_transport = this.isHeavy()
        ? this.formatToNumber(this.data[0].cost_transport_heavy)
        : this.formatToNumber(this.data[0].cost_transport_light)
      let price_times_weight = atual_cost_transport * Number(this.weight)
      this.cheapestShipping = {
        ...this.data[0],
        cost_transport: price_times_weight
      }
      for (let i = 1; i < this.data.length; i++) {
        atual_cost_transport = this.isHeavy()
          ? this.formatToNumber(this.data[i].cost_transport_heavy)
          : this.formatToNumber(this.data[i].cost_transport_light)

        if (this.cheapestShipping.cost_transport > atual_cost_transport * Number(this.weight)) {
          price_times_weight = atual_cost_transport * Number(this.weight)
          this.cheapestShipping = {
            ...this.data[i],
            cost_transport: price_times_weight
          }
        }
      }
    },
    getFasterShipping() {
      if (!this.data) return
      if (this.data.length == 0) return
      let atual_cost_transport = this.isHeavy()
        ? this.formatToNumber(this.data[0].cost_transport_heavy)
        : this.formatToNumber(this.data[0].cost_transport_light)

      let price_times_weight = atual_cost_transport * Number(this.weight)
      this.fasterShipping = {
        ...this.data[0],
        cost_transport: price_times_weight
      }
      for (let i = 1; i < this.data.length; i++) {
        atual_cost_transport = this.isHeavy()
          ? this.formatToNumber(this.data[i].cost_transport_heavy)
          : this.formatToNumber(this.data[i].cost_transport_light)

        if (
          this.formatToNumber(this.fasterShipping.lead_time) >
          this.formatToNumber(this.data[i].lead_time)
        ) {
          price_times_weight = atual_cost_transport * Number(this.weight)
          this.fasterShipping = {
            ...this.data[i],
            cost_transport: price_times_weight
          }
        }
      }
    }
  },
  components: { ShipmentForm, BestTransport }
})
</script>

<style scoped>
.shipmentCard {
  max-width: 1280px;
  height: 600px;
  max-height: 90%;
  width: -webkit-fill-available;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
.shipmentCard > .navbar {
  background-color: rgba(0, 172, 166, 0.5);
  padding: 0 2rem;
  height: 50px;
}
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}
.navbar-brand > svg {
  font-size: 1.5em;
}
.shipmentCard > .content {
  height: calc(100% - 60px);
  padding: 20px;
  display: flex;
}
.clearBtn {
  position: absolute !important;
  bottom: 20px !important;
  right: 40px !important;
}
@media (max-width: 1000px) {
  .shipmentCard > .content {
    padding: 10px;
  }
  .clearBtn {
    bottom: 10px !important;
    right: 30px !important;
  }
}
</style>
