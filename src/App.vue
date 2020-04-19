<template>
  <div class="container mx-auto">
    <ul>
      <li v-for="product in products" :key="product.id" class="flex mb-4">
        <Product
          :product="product"
          @toggleBought="() => onToggleBought(product.id, product.bought)"
          @delete="() => onDelete(product.id)"
        />
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
import Product from './components/Product';
export default {
  name: 'App',
  components: {
    Product,
  },
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
          .then(() => {
            this.name = '';
            this.description = '';
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
    onToggleBought(id, bought) {
      firestore
        .collection('products')
        .doc(id)
        .update({bought: !bought})
        .then(() => console.log('updated'))
        .catch((err) => console.log(err));
    },
    onDelete(id) {
      const confirmDelete = confirm('Delete?');
      if (confirmDelete) {
        firestore
          .collection('products')
          .doc(id)
          .delete()
          .then(() => console.log('deleted'))
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>
