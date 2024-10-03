<template>
  <v-container class="w-100 fill-height justify-center">
    <v-card width="90%" variant="text">
      <v-row class="w-100 pt-16" align="center">
        <v-col cols="11" md="7">
          <v-card-title class="text-h3 w-100 text-primary">O projektu</v-card-title>
          <v-card-text class="text-h5">
            {{ aboutTxt }}
          </v-card-text>
        </v-col>
        <v-col cols="11" md="5">
          <v-img :src="aboutImg" width="100%" height="100%"></v-img>
        </v-col>
      </v-row>

      <v-row class="px-6 py-2 w-100">
        <v-card-title class="text-h4 py-2 pt-xl-6 w-100 text-primary">Tehnološki Stack</v-card-title>
        <v-card-text class="text-h6">
          <ul class="px-4">
            <li class="px-2 py-1">
              <div class="font-weight-medium mr-2">Frontend:</div>
              Vue.js s Vuetify za sučelje i Pinia Store za upravljanje stanjem.
            </li>
            <li class="px-2 py-1">
              <div class="font-weight-medium mr-2">Backend:</div>
              Express.js s Prisma ORM za rad s MySQL bazom, pokrenutom u Dockeru.
            </li>
          </ul>
        </v-card-text>
        <v-card-title class="text-h4 py-2 pt-lg-6 w-100 text-primary">Funkcionalnosti</v-card-title>
        <v-card-text class="text-h6">
          <ul class="px-4">
            <li class="px-2 py-1">
              Pregled, filtriranje i naručivanje proizvoda.
            </li>
            <li class="px-2 py-1">
              Korisnički računi s registracijom i prijavom.
            </li>
            <li class="px-2 py-1">
              Admin panel za upravljanje proizvodima i narudžbama.
            </li>
          </ul>
        </v-card-text>
      </v-row>
    </v-card>

    <v-row class="d-flex py-12 w-100 justify-space-evenly">
      <v-card-title class="text-center text-sm-h3 w-100 text-primary py-6">O nama</v-card-title>
        <v-card class="ma-4" variant="text" min-width="250px" width="350px">
          <v-row justify="center">
            <v-img :src="firstProfileImg" class="bg-secondary mx-16 mt-4 aspect-ratio overflow border-sm" rounded="circle">
              <template #placeholder>
                <v-row class="image-style" align="center" justify="center">
                  <v-icon size="4rem" class="alt-icon text-primary">mdi-image-outline</v-icon>
                </v-row>
              </template>
            </v-img>
          </v-row>

          <v-row>
            <v-card-title class="text-center w-100 mt-6 text-h4 text-primary">{{ firstProfileName }}</v-card-title>
            <v-card-text class="ma-4 text-h6 ma-lg-6 text-center">{{ firstProfileDesc }}</v-card-text>
          </v-row>
        </v-card>

        <v-card class="ma-4" variant="text" min-width="250px" width="350px">
          <v-row justify="center">
            <v-img :src="secondProfileImg" class="bg-secondary mx-16 mt-4 overflow aspect-ratio border-sm" rounded="circle">
              <template #placeholder>
                <v-row class="image-style" align="center" justify="center">
                  <v-icon size="4rem" class="alt-icon text-primary">mdi-image-outline</v-icon>
                </v-row>
              </template>
            </v-img>
          </v-row>

          <v-row>
            <v-card-title class="text-center w-100 mt-6 text-h4 text-primary">{{ secondProfileName }}</v-card-title>
            <v-card-text class="ma-4 ma-lg-6 text-h6 text-center">{{ secondProfileDesc }}</v-card-text>
          </v-row>
        </v-card>
    </v-row>
  </v-container>
</template>

<script setup>

const aboutImg = '/about-img.png';
const aboutTxt = 'Ovaj projekt je moderna web aplikacija razvijena s Vue.js i Vuetify za\n' +
  '            Stolariju Barbarić, specijaliziranu za prodaju namještaja poput kuhinja,\n' +
  '            ormara i spavaćih soba. Aplikacija omogućava korisnicima pregled i\n' +
  '            naručivanje proizvoda online.';

const firstProfileImg = '/tin.jpeg';
const firstProfileName = 'Tin Soče';
const firstProfileDesc = 'Dolazim iz Čitluka. Završio sam Opću gimnaziju u Čitluku.' +
  '              Student sam 3. Godine informatike na fakultetu prirodoslovno-matematičkih i odgojnih znanosti.';

const secondProfileImg = '/robert.jpeg';
const secondProfileName = 'Robert Crnoja';
const secondProfileDesc = 'Dolazim iz Jajca. Završio sam srednju školu tehničar za računarstvo.' +
  '              Student sam 3. godine informatike na fakultetu prirodoslovno-matematičkih i odgojnih znanosti.';

</script>

<style scoped>
.image-style {
  width: 110%;
  height: 110%;
  border-radius: 50%;
}

.aspect-ratio {
  aspect-ratio: 1 / 1;
}
</style>
