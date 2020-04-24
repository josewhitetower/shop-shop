<template>
  <div class="max-w-2xl mx-auto text-gray-800 px-4 relative">
    <div class="absolute inset-0 bg-white p-8" v-if="!shopListName">
      <h1 class="text-center text-2xl mb-4">Create Shop List</h1>
      <form class="flex flex-col" @submit.prevent="addShopList">
        <input
          type="text"
          name=""
          id=""
          ref="shopListName"
          placeholder="Shop List Name"
          class="p-2 mb-4"
          @change="addShopList"
        />
        <button class="border py-2 rounded-sm">Create</button>
      </form>
    </div>
    <div v-else>
      <h1 class="text-2xl mb-4 text-center">Shop-Shop</h1>
      <ul class="">
        <li
          v-for="product in boughtProducts"
          :key="product.id"
          class="flex my-2"
        >
          <Product
            :product="product"
            @toggleBought="() => onToggleBought(product.id, product.bought)"
            @delete="() => onDelete(product.id)"
            @edit="(value) => onEdit(value, product.id)"
          />
        </li>
        <li v-if="visible" class="my-2">
          <ProductForm
            @add="(value) => onAdd(value)"
            @delete="visible = false"
          />
        </li>
        <li v-else class="my-2">
          <span class="flex cursor-pointer" @click="visible = true">
            <v-icon name="plus" class="h-6 w-6 mr-2"></v-icon>
            Product
          </span>
        </li>
      </ul>
      <hr class="my-8 w-full" />
      <ul>
        <li
          v-for="product in unboughtProducts"
          :key="product.id"
          class="flex mb-4"
        >
          <Product
            :product="product"
            @toggleBought="() => onToggleBought(product.id, product.bought)"
            @delete="() => onDelete(product.id)"
            @edit="(value) => onEdit(value, product.id)"
          />
        </li>
      </ul>
    </div>
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
    amount: '',
    visible: false,
    shopListName: '',
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
    const shopListName = window.localStorage.getItem('shopListName');
    if (shopListName) {
      this.shopListName = shopListName;
    }
    this.detectChanges();
  },
  methods: {
    addShopList() {
      try {
        this.shopListName = this.$refs['shopListName'].value
          .trim()
          .toLowerCase();
        window.localStorage.setItem('shopListName', this.shopListName);
        this.detectChanges();
      } catch (error) {
        console.log(error);
      }
    },
    addProduct() {
      if (this.name) {
        const product = {
          name: this.name,
          amount: this.amount,
          bought: false,
        };
        firestore
          .collection(this.shopListName)
          .add(product)
          .then(() => {
            this.name = '';
            this.amount = '';
          })
          .catch((error) => console.log(error));
      }
    },
    detectChanges() {
      if (this.shopListName) {
        firestore.collection(this.shopListName).onSnapshot((querySnapshot) => {
          this.products = querySnapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          });
        });
      }
    },
    onToggleBought(id, bought) {
      firestore
        .collection(this.shopListName)
        .doc(id)
        .update({bought: !bought})
        .then(() => console.log('updated'))
        .catch((err) => console.log(err));
    },
    onDelete(id) {
      const confirmDelete = confirm('Delete?');
      if (confirmDelete) {
        firestore
          .collection(this.shopListName)
          .doc(id)
          .delete()
          .then(() => console.log('deleted'))
          .catch((err) => console.log(err));
      }
    },
    onEdit(value, id) {
      firestore
        .collection(this.shopListName)
        .doc(id)
        .update(value)
        .then(() => console.log('edited'))
        .catch((err) => console.log(err));
    },
    onAdd(value) {
      this.visible = false;
      firestore
        .collection(this.shopListName)
        .add(value)
        .then(() => console.log('added'))
        .catch((err) => console.log(err));
    },
  },
};
</script>
