<template>
  <div>
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img :src="product.image" :alt="product.title" width="100%">
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
    </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors" :key="color">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value=color v-model="currentColor">
          <span class="colors__value"
            :style="{ backgroundColor: color, border: '1px solid #D0D0D0' }">
          </span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import goToPage from '@/helpers/goToPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['product'],
  filters: {
    numberFormat,
  },
  data() {
    return {
      currentColor: this.product.colors[0],
    };
  },
  methods: {
    goToPage,
  },
};
</script>
