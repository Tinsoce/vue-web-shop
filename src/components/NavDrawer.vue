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
  const navItems = [
    { title: "Početna", icon: "mdi-home", href: "/" },
    { title: "Artikli", icon: "mdi-shopping", href: "/products" },
    { title: "O nama", icon: "mdi-information", href: "/about" },
  ]
</script>