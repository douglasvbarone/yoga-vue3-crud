<template>
  <div>
    <v-row>
      <v-select
        v-model="selectedCategory"
        :items="items"
        placeholder="Select a
    category"
        @update:model-value="$emit('update', selectedCategory)"
        hide-details
        variant="outlined"
        density="comfortable"
      />
      <!-- <v-btn class="ml-2" variant="flat"><v-icon icon="mdi-plus" /></v-btn> -->
    </v-row>
  </div>
</template>
<script>
import gql from 'graphql-tag'

export default {
  name: 'CategorySelect',
  props: {
    currentCategory: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      selectedCategory: null
    }
  },
  computed: {
    items() {
      if (this.categories) {
        this.selectedCategory = this.currentCategory
        return this.categories.map(category => category.name)
      } else return []
    }
  },
  apollo: {
    categories: {
      fetchPolicy: 'network-only',
      query: gql`
        query {
          categories {
            id
            name
          }
        }
      `
    }
  }
}
</script>
