<template>
  <div>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ cartItems.length }} товаров
      </span>
    </div>

    <div v-if="$store.state.cartLoading">
        Загрузка...
        <BaseLoader/>
      </div>
    <div v-else-if="$store.state.cartLoadingError">
      <p>При загрузке произошла ошибка.</p>
      <button @click.prevent="loadCart()">
        Попробовать ещё раз
      </button>
    </div>
    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="cartItem of cartItems" :cartItem="cartItem" :key="cartItem.productId"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>

  </div>
</template>

<script>
import CartItem from '@/components/CartItem.vue';
import numberFormat from '@/helpers/numberFormat';
import { mapActions, mapGetters } from 'vuex';
import BaseLoader from '@/components/BaseLoader.vue';

export default {
  components: { CartItem, BaseLoader },
  filters: { numberFormat },
  computed: {
    ...mapGetters({ cartItems: 'cartProductsDetail', totalPrice: 'cartTotalPrice' }),
  },
  methods: {
    ...mapActions(['loadCart']),
  },
};
</script>s
