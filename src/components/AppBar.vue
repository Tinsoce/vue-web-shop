<template>
  <v-app-bar :elevation="0">
    <template v-slot:prepend>
      <v-app-bar-nav-icon v-if="!display.mdAndUp.value" @click="toggleDrawer" class="text-primary"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title class="text-primary">Logo i ime</v-app-bar-title>

    


    <template v-slot:append>
      <v-btn
        v-if="display.mdAndUp.value"
        v-for="(item, index) in navItems"
        :key="index"
        :to="item.href"
        :text="item.title"
        variant="plain"
        class="mx-2 text-primary"
      />
      <v-btn v-if="display.smAndUp.value" append-icon="mdi-login" class="bg-primary mx-4" to="/login" >
        Login
      </v-btn>
      <v-btn v-else size="small" icon="mdi-login" class="bg-primary mx-4" to="/login" rounded />
    </template>
    
  </v-app-bar>

  <NavDrawer v-model="drawer" />
</template>

<script setup>
  import { ref, watch } from 'vue';
  import { useDisplay } from 'vuetify';


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

</script>

<style scoped>

</style>