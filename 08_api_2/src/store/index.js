import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import API_BASE_URL from '@/config';
import countTotal from '@/helpers/countTotal';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    cartLoading: false,
    cartLoadingError: true,
    orderInfo: null,
  },
  mutations: {
    updateCartProductQuantity(state, { productId, quantity }) {
      const product = state.cartProducts.find((item) => item.productId === productId);

      if (product) {
        product.quantity = quantity;
      }
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, productsData) {
      state.cartProductsData = productsData;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        price: item.price,
        quantity: item.quantity,
      }));
    },
    updateCartLoadingStatus(state, boolean) {
      state.cartLoading = boolean;
    },
    updateCartErrorStatus(state, boolean) {
      state.cartLoadingError = boolean;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
  },
  getters: {
    cartProductsDetail(state) {
      return state.cartProducts.map(
        (cartItem) => {
          const { product } = state.cartProductsData.find(
            (item) => item.product.id === cartItem.productId,
          );

          return {
            ...cartItem,
            product: {
              ...product,
              image: product.image.file.url,
            },
          };
        },
      );
    },
    cartTotalPrice(state) {
      return countTotal(state.cartProducts);
    },
  },
  actions: {
    loadCart(context) {
      context.commit('updateCartLoadingStatus', true);
      context.commit('updateCartErrorStatus', false);

      axios
        .get(`${API_BASE_URL}/api/baskets`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }

          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        })
        .catch(() => { context.commit('updateCartErrorStatus', true); })
        .then(() => { context.commit('updateCartLoadingStatus', false); });
    },
    addProductToCart(context, { productId, quantity }) {
      return axios
        .post(`${API_BASE_URL}/api/baskets/products`, {
          productId,
          quantity,
        }, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    updateCartProductQuantityData(context, { productId, quantity }) {
      context.commit('updateCartProductQuantity', { productId, quantity });
      if (quantity === '') {
        return null;
      }

      return axios
        .put(`${API_BASE_URL}/api/baskets/products`, {
          productId,
          quantity,
        }, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    deleteProductFromCart(context, { productId }) {
      return axios
        .delete(`${API_BASE_URL}/api/baskets/products`, {
          data: {
            productId,
          },
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    loadOrderInfo(context, orderId) {
      return axios
        .get(`${API_BASE_URL}/api/orders/${orderId}`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateOrderInfo', response.data);
        });
    },
  },
});
