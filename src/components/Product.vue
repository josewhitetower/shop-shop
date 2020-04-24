<template>
  <div
    class="flex w-full"
    :class="{'line-through text-gray-500': product.bought}"
  >
    <span @click="$emit('toggleBought')">
      <v-icon :name="isBought" class="h-6 w-6 mr-2 cursor-pointer" />
    </span>
    <div class="flex-col flex w-full">
      <textarea
        :value="product.name"
        @change="onChange"
        name="name"
        class="focus:outline-none resize-none"
        @input="resizeTextArea"
        ref="name"
      />
      <textarea
        :value="product.amount"
        @change="onChange"
        name="amount"
        class="text-gray-500 focus:outline-none resize-none"
        ref="description"
      />
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
    },
  },
  data: () => ({
    name: '',
    amount: '',
  }),
  mounted() {
    Object.keys(this.$refs).forEach((key) =>
      this.resizeTextArea({target: {name: key}})
    );
  },
  methods: {
    onChange(e) {
      this.$emit('edit', {
        [e.target.name]: e.target.value,
      });
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
