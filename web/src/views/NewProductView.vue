<template>
  <v-dialog :model-value="true">
    <v-card :style="{ width: '400px' }">
      <v-card-title>
        <span class="headline">Add Product</span>
      </v-card-title>
      <v-card-text> </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="accent" flat @click="$router.back()">Cancel</v-btn>
        <v-btn color="primary" flat @click="$emit('close')">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
