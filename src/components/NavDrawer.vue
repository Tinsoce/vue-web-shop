<template>
  <v-navigation-drawer
    width="300"
    location="left"
    temporary
  >
    <v-list nav>
      <v-list-item 
        v-for="(item, index) in navItems"
        color="primary"
        :key="index"
        :prepend-icon="item.icon"
        :link="true"
        :to="item.href"
        exact
        :title="item.title"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
  import { useAuthStore } from '@/stores/useAuthStore';

  const authStore = useAuthStore();
  const isAdmin = authStore.auth.role === 'ADMIN';

  let navItems = [];

  const userNavItems = [
    { title: 'Početna', icon: 'mdi-home', href: '/' },
    { title: 'Artikli', icon: 'mdi-shopping', href: '/products' },
    { title: 'O nama', icon: 'mdi-information', href: '/about' },
  ];

  const adminNavItems = [
    { title: 'Dodaj artikal', icon: 'mdi-plus-circle-outline', href: '/products/create' },
    { title: 'Upravljanje artiklima', icon: 'mdi-store-edit', href: '/products/update' },
    { title: 'Pregled narudžbi', icon: 'mdi-format-list-bulleted', href: '/orders' },
  ];

  if (isAdmin) {
    navItems = [
      ...userNavItems.slice(0, 2),
      ...adminNavItems,
      ...userNavItems.slice(2, 3),
    ];
  } else {
    navItems = [ ...userNavItems ];
  }
</script>