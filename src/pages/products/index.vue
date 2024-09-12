<template>
  <h1>Artikli</h1>
  
  <div v-if="productStore.loading">Loading...</div>
  
  <div v-if="productStore.error">{{ productStore.error }}</div>

  <div v-if="!productStore.loading && !productStore.error">
    <ul>
      <li v-for="product in productStore.products" :key="product.id">
        {{ product.id }} - {{ product.name }} - {{ product.price }}&
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { useAuthStore } from '@/stores/useAuthStore';
  import { useProductStore } from '@/stores/useProductStore';
  import { onMounted } from 'vue';

  const authStore = useAuthStore();
  const productStore = useProductStore();
  const products = productStore.product;

  onMounted(() => {
    productStore.fetchProducts();
  });
</script>