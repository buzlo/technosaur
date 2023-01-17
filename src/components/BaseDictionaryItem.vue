<template>
  <li class="dictionary__item">
    <span class="dictionary__key">
      {{ dictionaryKey }}
    </span>
    <span class="dictionary__value">
      {{ dictionaryValue }}
    </span>
  </li>
</template>

<script>
export default {
  props: ['dictionaryKey', 'dictionaryValue'],
};
</script>
