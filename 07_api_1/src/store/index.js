import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [
      { productId: 1, amount: 2 },
    ],
  },
  mutations: {
    addProductToCart(state, { productId, amount }) {
      const product = state.cartProducts.find((item) => item.productId === productId);

      if (product) {
        product.amount += amount;
      } else {
        state.cartProducts.push({
          productId,
          amount,
        });
      }
    },
    updateCartProductAmount(state, { productId, amount }) {
      const product = state.cartProducts.find((item) => item.productId === productId);

      if (product) {
        product.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
    },
  },
  getters: {
    cartProductsDetail(state) {
      return state.cartProducts.map(
        (cartItem) => ({
          ...cartItem,
          product: products.find((productsItem) => productsItem.id === cartItem.productId),
        }),
      );
    },
    cartTotalPrice(state, getters) {
      return getters.cartProductsDetail.reduce((total, item) => (
        item.product.price * item.amount + total
      ), 0);
    },
  },
});
