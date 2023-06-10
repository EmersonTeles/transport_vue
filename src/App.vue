<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',

  data() {
    return {
      //
    }
  }
})
</script>
<style>
.xx-large {
  font-size: calc(var(--v-icon-size-multiplier) * 4em) !important;
}
</style>
