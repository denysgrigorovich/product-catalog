<template>
  <v-app class="main-app">
    <router-view/>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',

  data () {
    return {
      //
    }
  },
})
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    font-family: system-ui;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #9FA8DA;
      border-radius: 10px;
    }
  }

  div,
  span {
    user-select: none;
  }

  .main-app {
    background-color: rgb(140, 158, 255, 0.2) !important;
  }
</style>