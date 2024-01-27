import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    selectedProduct: null
  },
  getters: {
    getProductById: (state) => (id: number) => {
      return state.products.find((product) => product['id'] === id);
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setSelectedProduct(state, product) {
      state.selectedProduct = product;
    }
  },
  actions: {
    getProductById({commit}, productId) {
      axios.get(`http://localhost:3000/api/products/${productId}`)
          .then((response) => {
            commit('setSelectedProduct', response.data);
          });
    }
  },
  modules: {
  }
})
