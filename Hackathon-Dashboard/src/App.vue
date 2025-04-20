<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <v-app>
    <v-main>
      <navbar />
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup></script>

<style>
@font-face {
  font-family: Gopher-Medium;
  src: url("../src/assets/Gopher-Medium.ttf");
}

@font-face {
  font-family: Avenir-Next;
  src: url("../src/assets/AvenirNextLTPro-Regular.otf");
}

@font-face {
  font-family: Avenir-Next-Bold;
  src: url("../src/assets/AvenirNextLTPro-Bold.otf");
}

h1 {
  font-family: "Gopher-Medium", sans-serif;
}

h2 {
  font-family: "Gopher-Medium", sans-serif;
}

h3 {
  font-family: "Avenir-Next-Bold", sans-serif;
}

p {
  font-family: "Avenir-Next", sans-serif;
}

.MainColor {
  background: #d6e2ff;
  color: #7a9fff;
}

.SecondaryColor {
  background-color: #fbd6c5;
  color: #f15c1c;
}
</style>
