<template>
  <li class="cart__item product"
      >
      <div class="product__pic">
        <img :src="cartItem.product.image" width="120" height="120"
              :alt="cartItem.product.title">
      </div>
      <h3 class="product__title">
        {{ cartItem.product.title }}
      </h3>
      <!-- <p class="product__info">
        Объем: <span>128GB</span>
      </p> -->
      <span class="product__code">
        Артикул: {{ cartItem.productId }}
      </span>

      <BaseCounter v-model.number="quantity"/>

      <b class="product__price">
        {{ (cartItem.quantity * cartItem.product.price) | numberFormat }} ₽
      </b>

      <button class="product__del button-del" type="button"
              aria-label="Удалить товар из корзины"
              @click.prevent="deleteItem({ productId: cartItem.productId })">
        <svg width="20" height="20" fill="currentColor">
          <use xlink:href="#icon-close"></use>
        </svg>
      </button>
    </li>
</template>

<script>
import BaseCounter from '@/components/BaseCounter.vue';
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';

export default {
  components: { BaseCounter },
  props: ['cartItem'],
  filters: { numberFormat },
  computed: {
    quantity: {
      get() {
        return this.cartItem.quantity;
      },
      set(value) {
        return this.$store.dispatch('updateCartProductQuantityData', { productId: this.cartItem.productId, quantity: value });
      },
    },
  },
  methods: {
    ...mapActions(['deleteProductFromCart']),
    deleteItem({ productId }) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Удалить товар из корзины?')) {
        this.deleteProductFromCart({ productId });
      }
    },
  },
};
</script>
