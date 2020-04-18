<template>
  <div class="">
    <ul>
      <li v-for="product in products" :key="product.name">
        {{ product.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import firestore from "./firestore";
export default {
  name: "App",
  components: {},
  data: () => ({
    products: []
  }),
  mounted() {
    this.getAllProducts();
  },
  methods: {
    getAllProducts() {
      firestore
        .collection("products")
        .get()
        .then(querySnapshots => {
          this.products = querySnapshots.docs.map(doc => doc.data());
        });
    }
  }
};
</script>
