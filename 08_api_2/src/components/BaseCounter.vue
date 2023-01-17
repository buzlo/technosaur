<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар"
      @click="count(quantity - 1)">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <label>
      <input type="text" :value="quantity"
        @input="$emit('count', $event.target.value)" name="count">
    </label>

    <button type="button" aria-label="Добавить один товар"
      @click="count(quantity + 1)">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'quantity',
    event: 'count',
  },
  props: ['quantity'],
  methods: {
    count(newQuantity) {
      if (newQuantity > 0) {
        this.$emit('count', newQuantity);
      }
    },
  },
};
</script>
