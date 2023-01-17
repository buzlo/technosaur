<template>
  <main class="content container">
    <div v-if="productLoading">
      Загрузка...
      <BaseLoader/>
    </div>
    <div v-else-if="!productData">
      <p>При загрузке произошла ошибка.</p>
      <button @click.prevent="loadProducts">
        Попробовать ещё раз
      </button>
    </div>
    <div v-else>
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
              Каталог
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <!-- альтернативный вариант для перехода через метод компонента:
            @click.prevent="$router.push({ name: 'main' })" -->
            <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
              {{ category.title }}
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
              {{ product.title }}
            </a>
          </li>
        </ul>
      </div>
      <section class="item">
        <div class="item__pics pics">
          <div class="pics__wrapper">
            <img width="570" height="570" :src="product.image.file.url" :alt="product.title">
          </div>
        </div>
        <div class="item__info">
          <span class="item__code">Артикул: {{ product.id }}</span>
          <h2 class="item__title">
            {{ product.title }}
          </h2>
          <div class="item__form">
            <form class="form" action="#" @submit.prevent="addToCart">
              <b class="item__price">
                {{ product.price | numberFormat }} ₽
              </b>
              <fieldset class="form__block">
                <legend class="form__legend">Цвет:</legend>
                <ul class="colors">
                  <li class="colors__item" v-for="color in colors" :key="color.id">
                    <label class="colors__label">
                      <input class="colors__radio sr-only" type="radio"
                       :value=color v-model="currentColor">
                      <span class="colors__value"
                        :style="{ backgroundColor: color.code, border: '1px solid #D0D0D0' }">
                      </span>
                    </label>
                  </li>
                </ul>
              </fieldset>
              <div class="item__row">
                <BaseCounter v-model="productQuantity" />
                <button class="button button--primery"
                type="submit" :disabled="productAddSending">
                  В корзину
                </button>
              </div>
              <div v-show="productAddSending">Добавляем товар в корзину...</div>
              <div v-show="productAdded">Товар добавлен в корзину</div>
            </form>
          </div>
        </div>
        <div class="item__desc">
          <ul class="tabs">
            <li class="tabs__item">
              <a class="tabs__link tabs__link--current">
                Описание
              </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#">
                Характеристики
              </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#">
                Гарантия
              </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#">
                Оплата и доставка
              </a>
            </li>
          </ul>
          <div class="item__content">
            <p>
              Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
              Синхронизация со смартфоном<br>
              Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
              Поддержка сторонних приложений<br>
            </p>
            <a href="#">
              Все характеристики
            </a>
            <h3>Что это?</h3>
            <p>
              Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать
              свои велотренировки, сделав их максимально эффективными. Wahoo ELEMNT BOLT
              GPS синхронизируется с датчиками по ANT+, объединяя полученную с них информацию.
              Данные отображаются на дисплее, а также сохраняются на смартфоне. При этом на
              мобильное устройство можно установить как фирменное приложение, так и различные
              приложения сторонних разработчиков. Велокомпьютер точно отслеживает
              местоположение, принимая сигнал с целого комплекса спутников. Эта информация
              позволяет смотреть уже преодоленные маршруты и планировать новые велопрогулки.
            </p>
            <h3>Дизайн</h3>
            <p>
              Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют
              всего 74,6 x 47,3 x 22,1 мм. что не превышает габариты смартфона. Корпус гаджета
              выполнен из черного пластика. На обращенной к пользователю стороне
              расположен дисплей диагональю 56 мм. На дисплей выводятся координаты и скорость, а
              также полученная со смартфона и синхронизированных датчиков информация: интенсивность,
              скорость вращения педалей, пульс и т.д. (датчики не входят в комплект
              поставки). Корпус велокомпьютера имеет степень защиты от влаги IPX7. Это означает,
              что устройство не боится пыли, а также выдерживает кратковременное (до 30 минут)
              погружение в воду на глубину не более 1 метра.
            </p>
          </div>
        </div>
      </section>

    </div>
  </main>
</template>

<script>
import goToPage from '@/helpers/goToPage';
import numberFormat from '@/helpers/numberFormat';
import BaseCounter from '@/components/BaseCounter.vue';
import BaseLoader from '@/components/BaseLoader.vue';
import axios from 'axios';
import API_BASE_URL from '@/config';
import { mapActions } from 'vuex';

export default {
  components: { BaseCounter, BaseLoader },
  data() {
    return {
      productQuantity: 1,
      productData: null,
      productLoading: false,
      productLoadingError: false,
      currentColor: null,

      productAdded: false,
      productAddSending: false,
    };
  },
  filters: {
    numberFormat,
  },
  computed: {
    product() {
      return this.productData;
    },
    category() {
      return this.productData.category;
    },
    colors() {
      return this.productData.colors;
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),
    goToPage,
    addToCart() {
      this.productAddSending = true;
      this.addProductToCart({ productId: this.product.id, quantity: this.productQuantity })
        .then(() => {
          this.productAddSending = false;
          this.productAdded = true;
        });
    },
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      axios.get(`${API_BASE_URL}/api/products/${+this.$route.params.id}`)
        .then((response) => {
          this.productData = response.data;
          [this.currentColor] = response.data.colors;
        })
        .catch(() => { this.productLoadingError = true; })
        .then(() => { this.productLoading = false; });
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
};
</script>
