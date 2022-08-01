<template>
  <v-btn-group style="height: 2em">
    <v-btn color="error" size="small" @click="$emit('delete')">
      <v-icon icon="mdi-delete" />
    </v-btn>
    <v-btn color="warning" size="small" @click="$emit('edit')">
      <v-icon icon="mdi-pencil"></v-icon>
    </v-btn>
  </v-btn-group>
</template>
<script>
export default {
  name: 'RowActions'
}
</script>
