<template>
  <li class="cart__order">
    <h3>{{ cartItem.product.title }} - {{ cartItem.quantity }} шт.</h3>
    <b>{{ (cartItem.product.price * cartItem.quantity) | numberFormat }} ₽</b>
    <span>Артикул: {{ cartItem.productId }}</span>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  filters: { numberFormat },
  props: ['cartItem'],
};
</script>
