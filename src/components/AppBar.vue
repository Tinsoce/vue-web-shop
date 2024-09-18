<template>
  <v-app-bar :elevation="0" height="120">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="toggleDrawer" class="text-primary hidden-md-and-up"></v-app-bar-nav-icon>
    </template>

    <div class="d-flex align-start w-100 pl-4">
    <v-app-bar-title>
      <RouterLink to="/" class="text-decoration-none">
        <v-img src="/logo.jpg" alt="logo" max-width="15rem"></v-img>
      </RouterLink>
    </v-app-bar-title>

    </div>

    <v-btn v-for="(item, index) in navItems" :key="index" :to="item.href" :text="item.title" variant="text" rounded
      class="mx-1 mx-lg-2 text-primary hidden-sm-and-down"/>

    <v-btn to="/cart" variant="plain">
      <v-chip color="primary" append-icon="mdi-cart" size="large" class="text-">{{ cartStore.cart.cartItems.length }}</v-chip>
    </v-btn>

    <template v-if="!isAuthenticated">
      <v-btn size="small" icon="mdi-login" class="bg-primary mx-2 hidden-sm-and-up" to="/login" />
      <v-btn v-if="display.smAndUp.value" append-icon="mdi-login" class="bg-primary mx-4" to="/login" rounded>
        Login
      </v-btn>
    </template>

    <template v-if="isAuthenticated">
      <v-btn v-if="display.smAndUp.value" append-icon="mdi-login" variant="outlined" rounded
        class="bg-outline text-primary mx-4" @click="logOut()">
        Logout
      </v-btn>
      <v-btn v-else size="small" icon="mdi-login" class="bg-outline text-primary mx-4" to="/login" variant="outlined" rounded="xl" />
    </template>


  </v-app-bar>

  <NavDrawer v-model="drawer" />
</template>

<script setup>
import { ref, watch } from 'vue';
import { useDisplay } from 'vuetify';
import { useAuthStore } from '@/stores/useAuthStore';
import router from '@/router';
import { useCartStore } from '@/stores/useCartStore';

const authStore = useAuthStore();
const cartStore = useCartStore();

const isAuthenticated = authStore.auth.isAuthenticated;
const isAdmin = authStore.auth.role === 'ADMIN';
const isUser = authStore.auth.role === 'USER';

let navItems = [];

const guestUserNavItems = [
  { title: 'Početna', href: '/' },
  { title: 'Artikli', href: '/products' },
  { title: 'O nama', href: '/about'}
];

const userNavItems = [
  { title: 'Narudžbe', href: '/orders' },
];

const adminNavItems = [
  { title: 'Upravljanje artiklima', href: '/manage' },
  { title: 'Narudžbe', href: '/orders' },
];

if (isAdmin) {
  navItems = [
    ...guestUserNavItems.slice(0, 2),
    ...adminNavItems,
  ];
} else if (isUser) {
  navItems = [
    ...guestUserNavItems.slice(0, 2),
    ...userNavItems,
    ...guestUserNavItems.slice(2, 3),
  ];
} else {
  navItems = [
    ...guestUserNavItems,
  ];
}

const drawer = ref(false);
const display = useDisplay();

const updateDrawerState = () => {
  if (display.mdAndUp.value) {
    drawer.value = false;
  }
};

watch(
  () => display.mdAndUp.value,
  () => {
    updateDrawerState();
  },
  { immediete: true }
);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const logOut = async () => {
  try {
    await authStore.logout();
    await router.push('/');
    window.location.reload();
  } catch (error) {
    console.error('Error during logout: ', error);
    throw error;
  }
};

</script>

<style scoped></style>