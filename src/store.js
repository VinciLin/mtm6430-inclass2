import Vue from 'vue'
import Vuex from 'vuex'
// 1
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 2
    products: []
  },
  mutations: {
    // 3
    // "state.products" product property from the state; "products" are sent to the database, rename whatever you want
    SET_PRODUCTS (state, products) {
      state.products = products
    },
    PRODUCTS_SOLD (state, data) {
      // update the product quantity in the state
      const productIndex = this.getters.getProductIndex(data.product.id)
      // state.products[productIndex].quantity =  state.products[productIndex].quantity - data.quantity;
      state.products[productIndex].quantity -= data.quantity
      // Make API call to update the DB
      axios
        .put('https://lin00146-week10.firebaseio.com/products.json', state.products)
        .then(response => {
          console.log('your data was updated' + response.status)
        })
    },
    PRODUCT_QUANTITY (state, data) {
      // Step6 get the index of the product from the array of products
      const productIndex = this.getters.getProductIndex(data.product.id)
      // Step7 update the quantity of the product at the found index
      state.products[productIndex].quantity = data.quantity
      // Make API call to update the DB
      axios
        .put('https://lin00146-week10.firebaseio.com/products.json', state.products)
        .then(response => {
          console.log('your data was updated' + response.status)
        })
    }
  },
  actions: {
    // fetchData(context){
    //   context.commit('SET_PRODUCTS',data);
    // }
    // 4
    fetchData ({commit}) {
      // get the data first
      axios
        .get('https://lin00146-week10.firebaseio.com/products.json')
      // after get data, then
        .then(response => {
          console.log(response.data)
          // commit
          commit('SET_PRODUCTS', response.data)
        })
    },
    buyProducts ({ commit }, { quantity, product }) {
      commit('PRODUCTS_SOLD', {quantity, product})
    },
    updateQuantity ({commit}, {quantity, product}) {
      // Step5 commit the mutation to update the state
      commit('PRODUCT_QUANTITY', {quantity, product})
    }
  },

  getters: {

    getProductById: state => id => {
      // "find "takes an array , search what you are looking for, "find "is just a js function
      // product.id each product will loop, the second id is what getters get in
      return state.products.find(product => product.id === id)
    },
    getProductIndex: state => id => {
      return state.products.findIndex(product => product.id === id)
    }
  }
})
