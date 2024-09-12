<template>
  <v-app-bar :elevation="0">
    <template v-slot:prepend v-if="!display.mdAndUp.value">
      <v-app-bar-nav-icon @click="toggleDrawer" class="text-primary"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>
      <RouterLink to="/" class="text-decoration-none pl-2 font-weight-medium text-primary" text="Logo i ime" />
    </v-app-bar-title>

    <v-btn v-if="display.mdAndUp.value" v-for="(item, index) in navItems" :key="index" :to="item.href"
      :text="item.title" variant="plain" class="mx-2 text-primary" />

    <template v-if="!isAuthenticated">
      <v-btn v-if="display.smAndUp.value" append-icon="mdi-login" class="bg-primary mx-4" to="/login">
        Login
      </v-btn>
      <v-btn v-else size="small" icon="mdi-login" class="bg-primary mx-4" to="/login" rounded />
    </template>

    <template v-if="isAuthenticated">
      <v-btn v-if="display.smAndUp.value" append-icon="mdi-login" variant="outlined" class="bg-outline text-primary mx-4" @click="logOut()">
        Logout
      </v-btn>
      <v-btn v-else size="small" icon="mdi-login" class="bg-primary mx-4" to="/login" rounded />
    </template>


  </v-app-bar>

  <NavDrawer v-model="drawer" />
</template>

<script setup>
import { ref, watch } from 'vue';
import { useDisplay } from 'vuetify';
import { useAuthStore } from '@/stores/useAuthStore';
import router from '@/router';

const authStore = useAuthStore();

const isAuthenticated = authStore.auth.isAuthenticated;

const navItems = [
  { title: 'Početna', href: '/' },
  { title: 'Artikli', href: '/products' },
  { title: 'O nama', href: '/about' },
];
const drawer = ref(false);
const display = useDisplay();

const updateDrawerState = () => {
  if (display.mdAndUp.value) {
    drawer.value = false;
  }
};

watch(
  () => display.mdAndUp.value,
  (newVal) => {
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