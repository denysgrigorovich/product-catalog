<template>
  <div class="product-details">
    <v-container class="my-5">
      <h1 class="mb-3 subheading grey--text">Product Details</h1>
      <div class="my-4">
        <v-btn to="/"
               router
               x-large
               plain
               color="indigo"
        >
          <v-icon dark> mdi-chevron-left </v-icon>
          Back to Catalog
        </v-btn>
      </div>

      <v-card class="pa-5" flat>
        <v-layout wrap class="pa-3 mb-3">
          <v-flex xs6 sm5 md4 v-if="selectedProduct">
            <v-img :src="`http://localhost:8080/${selectedProduct['image']}`" :lazy-src="`http://localhost:8080/${selectedProduct['image']}`" cover :width="400"></v-img>
          </v-flex>
          <v-flex xs-6 sm7 md8 v-if="selectedProduct" class="d-flex flex-column justify-space-between">
            <div>
              <div class="caption grey--text">Product name</div>
              <div>{{ selectedProduct['name'] }}</div>
            </div>
            <div>
              <div class="caption grey--text">Price</div>
              <div>{{ selectedProduct['price'] }}</div>
            </div>
            <div>
              <div class="caption grey--text">Length</div>
              <div>{{ selectedProduct['length'] }}</div>
            </div>
            <div>
              <div class="caption grey--text">Width</div>
              <div>{{ selectedProduct['width'] }}</div>
            </div>
            <div>
              <div class="caption grey--text">Description</div>
              <div>{{ selectedProduct['description'] }}</div>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'product-details',
  computed: {
    selectedProduct() {
      return this.$store.state.selectedProduct;
    },
  },
  beforeRouteEnter(to, from, next) {
    const productId = to.params.id;
    next((vm) => {
      vm.$store.dispatch('getProductById', productId);
    });
  }
})
</script>