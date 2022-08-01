<template>
  <v-btn-group style="height: 2em">
    <v-btn color="primary" size="small" @click="$emit('save')">
      <v-icon icon="mdi-content-save" />
    </v-btn>
    <v-btn color="grey" size="small" @click="$emit('cancel')">
      <v-icon icon="mdi-close"></v-icon>
    </v-btn>
  </v-btn-group>
</template>
