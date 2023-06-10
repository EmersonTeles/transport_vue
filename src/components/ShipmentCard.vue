<template>
  <v-card class="shipmentCard">
    <v-toolbar color="cyan-lighten-1" height="60">
      <v-icon size="small" icon="fas fa-truck-fast" class="mr-4 ml-8 text-white" />
      <h1 class="text-h6 text-white">Melhor Frete</h1>
    </v-toolbar>
    <main class="content">
      <ShipmentForm />
    </main>
  </v-card>
</template>

<script setup lang="ts">
import ShipmentForm from './ShipmentForm.vue'
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
  background-color: rgba(0, 172, 166, 0.5) !important;
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
}
</style>
