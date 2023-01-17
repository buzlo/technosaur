<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :color-id.sync="filterColorId"
        />
      <section class="catalog">

        <div v-if="productsLoading">
          Загрузка товаров...
          <BaseLoader/>
        </div>

        <div v-else-if="productsLoadingError">
          <p>При загрузке произошла ошибка.</p>
          <button @click.prevent="loadProducts">
            Попробовать ещё раз
          </button>
        </div>
        <ProductList v-else :products="products"/>
        <BasePagination
          v-model="page"
          :count="countProducts"
          :per-page="productsPerPage"
          />
      </section>
    </div>
  </main>
</template>

<script>
import BasePagination from '@/components/BasePagination.vue';
import BaseLoader from '@/components/BaseLoader.vue';
import ProductList from '@/components/ProductList.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';
import API_BASE_URL from '@/config';

export default {
  components: {
    BasePagination, BaseLoader, ProductList, ProductFilter,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,

      page: 1,
      productsPerPage: 3,

      productsData: null,
      productsLoading: false,
      productsLoadingError: true,
    };
  },
  computed: {
    products() {
      return this.productsData ? this.productsData.items.map((product) => ({
        ...product,
        image: product.image.file.url,
      }))
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingError = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/products`, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              colorId: this.filterColorId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
            },
          })
          .then((response) => { this.productsData = response.data; })
          .catch(() => { this.productsLoadingError = true; })
          .then(() => { this.productsLoading = false; });
      }, 0);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
