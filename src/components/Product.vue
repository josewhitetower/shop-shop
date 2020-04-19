<template>
  <div class="flex">
    <span @click="$emit('toggleBought')">
      <v-icon :name="isBought" class="h-6 w-6 mr-2 cursor-pointer" />
    </span>
    <div class="flex-col flex">
        <input type="text" :value="product.name" @change="onChange" name="name" />
        <input type="text" :value="product.description" @change="onChange" name="description" />
    </div>
    <span @click="$emit('delete')">
        <v-icon name="trash" class="h-6 w-6 mr-2 cursor-pointer" />
    </span>
  </div>
</template>

<script>
export default {
  props: ['product'],
  computed: {
    isBought() {
        return this.product.bought ? 'check-square' : 'square';
    }
  },
  data: () => ({
      name: '',
      description: ''
  }),
  methods: {
    onChange(e) {
        this.$emit('edit',{
            [e.target.name]: e.target.value
        })
    },
  }
};
</script>

<style></style>
