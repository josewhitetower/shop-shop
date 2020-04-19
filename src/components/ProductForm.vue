<template>
  <div class="flex">
    <span @click="bought = !bought">
      <v-icon :name="isBought" class="h-6 w-6 mr-2 cursor-pointer" />
    </span>
    <div class="flex-col flex">
      <input type="text" v-model="name" required />
      <input type="text" v-model="description" />
    </div>

    <span @click="addProduct">
      <v-icon name="plus" class="h-6 w-6 mr-2 cursor-pointer" />
    </span>
    <span @click="$emit('delete')">
      <v-icon name="trash" class="h-6 w-6 mr-2 cursor-pointer" />
    </span>
  </div>
</template>

<script>
export default {
  computed: {
    isBought() {
      return this.bought ? 'check-square' : 'square';
    },
  },
  data: () => ({
    name: '',
    description: '',
    bought: false,
  }),
  methods: {
    addProduct() {
      if (this.name) {
        this.$emit('add', {
          name: this.name,
          description: this.description,
          date: new Date(),
          bought: this.bought
        });
        this.name = '';
        this.description = ''
      } else {
          alert('Name is required!')
      }
    },
  },
};
</script>

<style></style>
