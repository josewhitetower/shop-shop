<template>
  <div class="container mx-auto text-gray-800">
    <ul>
      <li v-for="product in boughtProducts" :key="product.id" class="flex my-4">
        <Product
          :product="product"
          @toggleBought="() => onToggleBought(product.id, product.bought)"
          @delete="() => onDelete(product.id)"
          @edit="(value) => onEdit(value, product.id)"
        />
      </li>
      <li v-if="visible" class="my-4">
        <ProductForm @add="(value) => onAdd(value)" @delete="visible = false" />
      </li>
      <li v-else class="my-4">
        <span class="flex cursor-pointer" @click="visible = true">
          <v-icon name="plus" class="h-6 w-6 mr-2"></v-icon>
          Product
        </span>
      </li>
    </ul>
    <hr class="my-8"/>
    <ul>
      <li v-for="product in unboughtProducts" :key="product.id" class="flex mb-4">
        <Product
          :product="product"
          @toggleBought="() => onToggleBought(product.id, product.bought)"
          @delete="() => onDelete(product.id)"
          @edit="(value) => onEdit(value, product.id)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import firestore from './firestore';
import Product from './components/Product';
import ProductForm from './components/ProductForm';
export default {
  name: 'App',
  components: {
    Product,
    ProductForm,
  },
  data: () => ({
    products: [],
    name: '',
    description: '',
    visible: false,
  }),
  computed: {
    boughtProducts() {
      return this.products.filter((product) => !product.bought);
    },
    unboughtProducts() {
      return this.products.filter((product) => product.bought);
    },
  },
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
    onEdit(value, id) {
      firestore
        .collection('products')
        .doc(id)
        .update(value)
        .then(() => console.log('edited'))
        .catch((err) => console.log(err));
    },
    onAdd(value) {
      this.visible = false;
      firestore
        .collection('products')
        .add(value)
        .then(() => console.log('added'))
        .catch((err) => console.log(err));
    },
  },
};
</script>
