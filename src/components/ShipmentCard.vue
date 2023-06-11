<template>
  <v-card class="shipmentCard">
    <v-toolbar color="cyan-lighten-1" height="60">
      <v-icon size="small" icon="fas fa-truck-fast" class="mr-4 ml-8 text-white" />
      <h1 class="text-h6 text-white">Melhor Frete</h1>
    </v-toolbar>
    <main class="content">
      <ShipmentForm @formSubmited="handleFormSubmit" />
      <BestTransport v-if="searchOpen" :destination="destination" :weight="weight" />
      <div class="d-flex align-center justify-center w-100" v-else>
        <h1 class="text-h4">Nenhum dado selecionado.</h1>
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

export default defineComponent({
  name: 'ShipmentCard',
  methods: {
    handleFormSubmit(destination: string, weight: string) {
      this.destination = destination
      this.weight = Number(weight)
      this.searchOpen = true
    },
    clear() {
      this.searchOpen = false
    }
  },
  components: { ShipmentForm, BestTransport },
  data() {
    return { destination: '', weight: 0, searchOpen: false }
  }
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
</style>
