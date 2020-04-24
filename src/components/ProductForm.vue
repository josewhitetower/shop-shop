<template>
  <div class="flex">
    <span @click="bought = !bought">
      <v-icon :name="isBought" class="h-6 w-6 mr-2 cursor-pointer" />
    </span>
    <div class="flex-col flex w-full">
      <textarea v-model="name" required placeholder="Name" class="focus:outline-none resize-none" ref="name" @input="resizeTextArea"/>
      <textarea v-model="amount" placeholder="Amount" class="focus:outline-none resize-none" ref="description" @input="resizeTextArea"/>
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
    amount: '',
    bought: false,
  }),
  methods: {
    addProduct() {
      if (this.name) {
        this.$emit('add', {
          name: this.name,
          amount: this.amount,
          date: new Date(),
          bought: this.bought
        });
        this.name = '';
        this.amount = ''
      } else {
          alert('Name is required!')
      }
    },
    resizeTextArea(e) {
      const target = this.$refs[e.target.name];
      target.style = 'height:auto; padding:0';
      target.style = 'height:' + target.scrollHeight + 'px';
    },
  },
};
</script>

<style></style>
