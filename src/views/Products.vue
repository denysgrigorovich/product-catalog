<template>
  <div class="products-catalog">
    <v-container class="my-5">
      <h1 class="mb-3 subheading grey--text">Products Catalog</h1>

      <div class="d-flex justify-lg-space-between products-filters">
        <v-layout wrap>
          <v-flex md3>
            <v-select
                v-model="filters.selectedCategory"
                :items="filters.categories"
                item-text="label"
                item-value="value"
                color="indigo"
                item-color="indigo"
            ></v-select>
          </v-flex>
          <v-flex md3 class="d-flex justify-center">
            <v-checkbox v-model="filters.price" label="Price less than 20000" color="indigo"></v-checkbox>
          </v-flex>
          <v-flex md2 class="d-flex justify-center">
            <v-checkbox v-model="filters.length" label="Length more than 20" color="indigo"></v-checkbox>
          </v-flex>
          <v-flex md2 class="d-flex justify-center">
            <v-checkbox v-model="filters.width" label="Width more than 5" color="indigo"></v-checkbox>
          </v-flex>
          <v-flex md2 class="d-flex justify-center">
            <v-checkbox v-model="filters.status" label="In stock only" color="indigo"></v-checkbox>
          </v-flex>
        </v-layout>
      </div>

      <v-card flat v-for="product in filteredProducts" :key="product.id">
        <v-layout wrap :class="`pa-3 mb-3 align-center product ${product.status}`">
          <v-flex >
            <v-img :src="product.image" :lazy-src="product.image" cover :width="100"></v-img>
          </v-flex>
          <v-flex md3 sm3>
            <div class="caption grey--text">Product name</div>
            <div>{{ product.name }}</div>
          </v-flex>
          <v-flex md2 sm2>
            <div class="caption grey--text">Price</div>
            <div>{{ product.price }}</div>
          </v-flex>
          <v-flex md1 sm1>
            <div class="caption grey--text">Length</div>
            <div>{{ product.length }}</div>
          </v-flex>
          <v-flex md1 sm1>
            <div class="caption grey--text">Width</div>
            <div>{{ product.width }}</div>
          </v-flex>
          <v-flex md1 sm1>
            <div class="caption grey--text">Status</div>
            <div :class="product.status === 'in-stock' ? 'green--text' : 'red--text'">{{ product.status }}</div>
          </v-flex>
          <v-flex md2 sm1 class="d-flex justify-center">
            <v-btn :to="{ name: 'ProductDetails', params: { id: product.id } }"
                   :disabled = "product.status === 'sold-out'"
                   router
                   small
                   plain
                   color="indigo"
            >
              Details
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios';

  export default Vue.extend({
    name: 'products-page',
    data() {
      return {
        products: [],
        filters: {
          categories: [
            {label: "Select Category", value: "Select Category"},
            {label: "Graphics card", value: "Graphics card"},
            {label: "Processor", value: "Processor"},
            {label: "RAM", value: "RAM"},
            {label: "Motherboard", value: "Motherboard"}
          ],
          selectedCategory: "Select Category",
          price: false,
          length: false,
          width: false,
          status: false
        }
      };
    },
    mounted() {
      this.$router.replace({query: {}}).catch((error) => {
        console.warn(error);
      })

      this.GetProducts();
    },
    computed: {
      filteredProducts() {
        const { selectedCategory, price, length, width, status } = this.filters;

        return this.products.filter((product) => {
          const meetsCategory = selectedCategory === 'Select Category' || product.category === selectedCategory;
          const meetsPrice = !price || product.price <= 20000;
          const meetsLength = !length || product.length > 20;
          const meetsWidth = !width || product.width > 5;
          const meetsStatus = !status || product.status === 'in-stock';

          return meetsCategory && meetsPrice && meetsLength && meetsWidth && meetsStatus;
        });
      }
    },
    watch: {
      filters: {
        handler(newFilters) {
          console.log(newFilters);
          const filtersForUrl = Object.keys(newFilters).reduce((acc, key) => {
            if (
                key !== 'categories' &&
                newFilters[key] !== false &&
                !(key === 'selectedCategory' && newFilters[key] === 'Select Category')
            ) {
              acc[key] = newFilters[key];
            }
            return acc;
          }, {});

          this.$router.push({ query: filtersForUrl });
        },
        deep: true,
      }
    },
    methods: {
      GetProducts() {
        axios.get('http://localhost:3000/api/products')
            .then((response) => {
              this.products = response.data;
              this.$store.commit("setProducts", response.data);
            });
      }
    }
  })
</script>

<style scoped lang="scss">
  .products-catalog {
    .product {
      &.in-stock {
        border-left: 4px solid #027506;
      }

      &.sold-out {
        border-left: 4px solid #d94141;
      }
    }
  }
</style>