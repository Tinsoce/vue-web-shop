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
  const isUser = authStore.auth.role === 'USER';

  let navItems = [];

  const guestUserNavItems = [
    { title: 'Početna', icon: 'mdi-home', href: '/' },
    { title: 'Artikli', icon: 'mdi-shopping', href: '/products' },
    { title: 'O nama', icon: 'mdi-information', href: '/about' },
  ];

  const userNavItems = [
    { title: 'Narudžbe', icon: 'mdi-truck', href: '/orders' },
  ];

  const adminNavItems = [
    { title: 'Dodaj artikal', icon: 'mdi-plus-circle-outline', href: '/manage/create' },
    { title: 'Upravljanje artiklima', icon: 'mdi-store-edit', href: '/manage' },
    { title: 'Narudžbe', icon: 'mdi-format-list-bulleted', href: '/orders' },
  ];

  if (isAdmin) {
    navItems = [
      ...guestUserNavItems.slice(0,2),
      ...adminNavItems,
      ...guestUserNavItems.slice(2, 3),
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
</script>