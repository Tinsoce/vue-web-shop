<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="11" sm="10">
        <div v-for="order in sortedOrders" class="mx-2 py-2">
          <v-card :key="order.id" class="my-2" color="primary" variant="tonal" rounded="xl">
            <v-card-title class="text-h4">
              <RouterLink :to="`/order/${order.id}`" class="text-decoration-none text-primary">
                Narudžba {{ order.id }}
              </RouterLink>
            </v-card-title>
            <v-card-subtitle class="pb-6">
              Kreirana: {{ formatDate(order.createdAt) }}
            </v-card-subtitle>

            <v-card-text class="px-6 text-h6">
              <div class="font-weight-medium pr-16 mr-1">Artikli: </div>
              <div class="truncate-name">{{ productNames[order.id] || 'Loading...' }}</div>
            </v-card-text>
            <v-card-text  v-if="authStore.auth.role === 'ADMIN'" class="px-6">
              <div class="font-weight-medium pr-16 mr-3">User ID:</div>
              {{ order.user.id }}
            </v-card-text>
            <v-card-text  v-if="authStore.auth.role === 'ADMIN'" class="px-6">
              <div class="font-weight-medium pr-16 mr-8">Email:</div>
              {{ order.user.email }}
            </v-card-text>
            <v-card-text class="px-6">
              <div class="font-weight-medium pr-10">Ukupna cijena: </div>

              <div class="font-weight-bold">{{ formatPrice(order.total) }} KM</div>
            </v-card-text>
            <v-card-text class="px-6">
              <div class="font-weight-medium pr-16 mr-6">Status: </div>
              <div class="text-h6">{{ orderStatus(order.status) }}</div>
            </v-card-text>
            <v-card-actions v-if="authStore.auth.role === 'ADMIN' && order.status === 'PENDING'">
              <v-row class="pb-4">
                <v-col cols="6" class="text-end px-1 pl-7">
                  <v-btn append-icon="mdi-checkbox-marked-circle-outline" variant="tonal" rounded color="green"
                    class="w-100" @click="orderStore.updateOrderStatus(order.id, 'COMPLETED')">Prihvati</v-btn>
                </v-col>
                <v-col cols="6" class="text-start px-1 pr-7" justify-center>
                  <v-btn append-icon="mdi-close-circle-outline" variant="tonal" rounded color="red" class="w-100"
                    @click="orderStore.updateOrderStatus(order.id, 'CANCELLED')">Odbij</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>

    </v-row>
  </v-container>
</template>

<script setup>
import {useAuthStore} from '@/stores/useAuthStore';
import {useOrderStore} from '@/stores/useOrderStore';
import {useProductStore} from '@/stores/useProductStore';
import {onMounted} from 'vue';


const authStore = useAuthStore();
const productStore = useProductStore();
const orderStore = useOrderStore();
const productNames = ref({});

const orderStatus = (status) => {
  if (status === 'COMPLETED') {
    return 'PRIHVAĆENA';
  } else if (status === 'PENDING') {
    return 'NA ČEKANJU';
  } else if (status === 'CANCELLED') {
    return 'ODBIJENA';
  }
}

const formatDate = (date) => {
  const newDate = new Date(date);
  return new Intl.DateTimeFormat('hr-HR').format(newDate);
};

const formatPrice = (value) => {
  return new Intl.NumberFormat('hr-HR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const fetchProductsNames = async (orderId) => {
  try {
    const order = orderStore.orders.find(order => order.id === orderId);
    console.log(order)
    const names = order.items.map(item => item.name).join(', ');
    console.log(names);
    productNames.value[orderId] = names;
  } catch (error) {
    console.error('Error fetching products:', error);
    productNames.value[orderId] = 'Error fetching product names';
  }
};

const sortedOrders = computed(() =>  {
  return [...orderStore.orders].sort((a, b) => b.id - a.id);
});

onMounted(
  async () => {
    if (authStore.auth.role === 'ADMIN') {
      await orderStore.fetchAllOrders();
    }
    if (authStore.auth.role === 'USER') {
      await orderStore.fetchUserOrders();
      console.log(orderStore.orders)
    }
    await productStore.fetchProducts();
    orderStore.orders.forEach(order => fetchProductsNames(order.id));
  }
)
</script>

<style scoped>
  .truncate-name {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 3.5rem;
  }
</style>
