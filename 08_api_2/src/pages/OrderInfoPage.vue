<template>
    <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ 23621</span>
      </h1>
    </div>

    <section v-if="orderInfo" class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина.
            На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <BaseDictionaryItem :dictionaryKey="'Получатель'"
              :dictionaryValue="orderInfo.name"/>
            <BaseDictionaryItem :dictionaryKey="'Адрес доставки'"
              :dictionaryValue="orderInfo.address"/>
            <BaseDictionaryItem :dictionaryKey="'Телефон'"
              :dictionaryValue="orderInfo.phone"/>
            <BaseDictionaryItem :dictionaryKey="'Email'"
            :dictionaryValue="orderInfo.email"/>
            <BaseDictionaryItem :dictionaryKey="'Способ оплаты'"
            :dictionaryValue="'Картой при получении'"/>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <CartOrder v-for="basketItem of orderInfo.basket.items"
              :key="basketItem.id" :cartItem="basketItem"/>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>{{ deliveryPrice | numberFormat }} ₽</b></p>
            <p>Итого: <b>{{ orderInfo.basket.items.length }}</b> товара
              на сумму <b>{{ totalOrderPrice | numberFormat }} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseDictionaryItem from '@/components/BaseDictionaryItem.vue';
import CartOrder from '@/components/CartOrder.vue';
import countTotal from '@/helpers/countTotal';
import numberFormat from '@/helpers/numberFormat';

export default {
  components: { CartOrder, BaseDictionaryItem },
  filters: { numberFormat },
  data() {
    return {
      deliveryPrice: 500,
    };
  },
  computed: {
    orderInfo() {
      const {
        name, address, phone, email, basket,
      } = this.$store.state.orderInfo || {};
      return {
        name, address, phone, email, basket,
      };
    },
    totalOrderPrice() {
      return countTotal(this.orderInfo.basket.items) + this.deliveryPrice;
    },
  },
  created() {
    this.$store.dispatch('loadOrderInfo', this.$route.params.id);
  },
};
</script>
