<template>
  <div class="flex">
    <span @click="$emit('toggleBought')">
      <v-icon :name="isBought" class="h-6 w-6 mr-2 cursor-pointer" />
    </span>
    <div class="flex-col flex">
      <span>{{ product.name }}</span>
      <span>{{ product.description }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  computed: {
    isBought() {
      return this.product.bought ? 'check-square' : 'square';
    },
  },
};
</script>

<style></style>
