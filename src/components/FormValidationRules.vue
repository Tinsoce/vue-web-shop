<script>
  export const rules = {
    email: [
      (v) => !!v || "Email je obavezan",
      (v) => /.+@.+/.test(v) || "Email nije validan",
    ],

    password: [
      (v) => !!v || "Lozinka je obavezna",
      (v) => (v && v.length >= 8) || "Lozinka mora biti duža od 8 karaktera",
    ],
  };
</script>

<template>

</template>

<style scoped>

</style>