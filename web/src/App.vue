<template>
  <v-app>
    <v-main>
      <v-app-bar color="primary">
        <v-toolbar-title>Vue + GraphQL CRUD</v-toolbar-title>
      </v-app-bar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  })
}
</script>
