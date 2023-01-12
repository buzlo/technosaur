<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар"
      @click="count(amount - 1)">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <label>
      <input type="text" v-model.number="amountModel" name="count">
    </label>

    <button type="button" aria-label="Добавить один товар"
      @click="count(amount + 1)">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'amount',
    event: 'count',
  },
  props: ['amount'],
  methods: {
    count(newAmount) {
      if (newAmount > 0) {
        this.$emit('count', newAmount);
      }
    },
  },
  computed: {
    amountModel: {
      get() { return this.amount; },
      set(value) { this.$emit('count', value); },
    },
  },
};
</script>
