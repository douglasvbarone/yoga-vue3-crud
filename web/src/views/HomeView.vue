<template>
  <v-app>
    <v-app-bar app>Vue GraphQL CRUD</v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'HomeView',

  components: {}
}
</script>
