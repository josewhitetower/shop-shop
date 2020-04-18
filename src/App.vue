<template>
  <div class="">
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.name }}
      </li>
    </ul>
    <form @submit.prevent="addProduct">
      <label for="">Name</label>
      <input type="text" v-model="name" required />
      <label for="">Description</label>
      <textarea cols="30" rows="10" v-model="description"></textarea>
      <button>Add</button>
    </form>
  </div>
</template>

<script>
import firestore from './firestore';
export default {
  name: 'App',
  components: {},
  data: () => ({
    products: [],
    name: '',
    description: '',
  }),
  mounted() {
    this.detectChanges();
  },
  methods: {
    addProduct() {
      if (this.name) {
        const product = {
          name: this.name,
          description: this.description,
          bought: false,
        };
        firestore
          .collection('products')
          .add(product)
          .then((docRef) => {
            this.name = '';
            this.description = '';
            console.log(docRef);
          })
          .catch((error) => console.log(error));
      }
    },
    detectChanges() {
      firestore.collection('products').onSnapshot((querySnapshot) => {
        this.products = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
      });
    },
  },
};
</script>
