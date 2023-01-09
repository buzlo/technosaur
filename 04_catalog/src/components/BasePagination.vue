<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a href="#"
        @click.prevent="paginate(page - 1)"
        class="pagination__link
        pagination__link--arrow"
        :class="{'pagination__link--disabled': page === 1}"
        aria-label="Предыдущая страница">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumber of pages" :key="pageNumber">
      <a href="#" @click.prevent="paginate(pageNumber)" class="pagination__link"
      :class="{ 'pagination__link--current': pageNumber === page }">
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <a href="#"
        @click.prevent="paginate(page + 1)"
         class="pagination__link
        pagination__link--arrow"
        :class="{'pagination__link--disabled': page === pages}"
        aria-label="Следующая страница">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: ['page', 'count', 'perPage'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    paginate(page) {
      if (page > 0 && page <= this.pages) {
        this.$emit('paginate', page);
      }
    },
  },
};
</script>
