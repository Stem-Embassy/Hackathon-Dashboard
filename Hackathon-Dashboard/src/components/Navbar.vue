<template>
  <v-navigation-drawer class="pt-4" color="white" model-value rail>
    <RouterLink style="text-decoration: none; color: inherit" to="/">
      <v-icon
        icon="mdi-home"
        :size="30"
        class="d-block text-center mx-auto mb-9"
        to="/"
      />
    </RouterLink>
    <RouterLink style="text-decoration: none; color: inherit" to="/information">
      <v-icon
        icon="mdi-book"
        :size="30"
        class="d-block text-center mx-auto mb-9"
        to="/"
      />
    </RouterLink>
    <RouterLink style="text-decoration: none; color: inherit" to="/controller">
      <v-icon
        icon="mdi-controller"
        :size="30"
        class="d-block text-center mx-auto mb-9"
        to="/"
      />
    </RouterLink>

    <a
      href="http://localhost:8080/"
      target="_blank"
      style="text-decoration: none; color: inherit"
    >
      <v-icon
        icon="mdi-code-array"
        :size="30"
        class="d-block text-center mx-auto mb-9"
      />
    </a>

    <RouterLink style="text-decoration: none; color: inherit" to="/rankings">
      <v-icon
        icon="mdi-trophy"
        :size="30"
        class="d-block text-center mx-auto mb-9"
        to="/"
      />
    </RouterLink>
  </v-navigation-drawer>
</template>
