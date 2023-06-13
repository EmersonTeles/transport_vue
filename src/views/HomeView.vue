<template>
  <v-toolbar color="cyan-darken-2" height="60"
    ><v-toolbar-title class="text-white text-h5">Coorlab</v-toolbar-title></v-toolbar
  >
  <div class="home-content">
    <shipmentCard />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import shipmentCard from '../components/ShipmentCard.vue'

export default defineComponent({
  name: 'HomeView',
  components: { shipmentCard }
})
</script>
<style>
.home-content {
  min-height: calc(100vh - 60px) !important;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
</style>
