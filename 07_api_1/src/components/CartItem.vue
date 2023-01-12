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

      <BaseCounter v-model.number="amount"/>

      <b class="product__price">
        {{ (cartItem.amount * cartItem.product.price) | numberFormat }} ₽
      </b>

      <button class="product__del button-del" type="button"
              aria-label="Удалить товар из корзины" @click.prevent="deleteItem(cartItem.productId)">
        <svg width="20" height="20" fill="currentColor">
          <use xlink:href="#icon-close"></use>
        </svg>
      </button>
    </li>
</template>

<script>
import BaseCounter from '@/components/BaseCounter.vue';
import numberFormat from '@/helpers/numberFormat';
import { mapMutations } from 'vuex';

export default {
  components: { BaseCounter },
  props: ['cartItem'],
  filters: { numberFormat },
  computed: {
    amount: {
      get() {
        return this.cartItem.amount;
      },
      set(value) {
        return this.$store.commit('updateCartProductAmount', { productId: this.cartItem.productId, amount: value });
      },
    },
  },
  methods: {
    ...mapMutations({ deleteItem: 'deleteCartProduct' }),
  },
};
</script>
