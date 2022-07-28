<template>
  <div :style="{ maxWidth: '300px' }">
    <v-row>
      <v-select
        v-if="!addCategory"
        v-model="selectedCategory"
        :items="items"
        placeholder="Select a category"
        @update:model-value="$emit('update', selectedCategory)"
        hide-details
        variant="outlined"
        density="comfortable"
      />
      <v-text-field
        v-else
        placeholder="Type a new category"
        v-model="selectedCategory"
        @update:model-value="$emit('update', selectedCategory)"
        hide-details
        variant="outlined"
        density="comfortable"
      />
      <v-btn @click="toggleAddCategory" class="ml-2" variant="flat" icon>
        <v-icon :icon="addCategory ? 'mdi-backspace' : 'mdi-pencil-plus'" />
      </v-btn>
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
      selectedCategory: null,
      addCategory: false
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
  methods: {
    toggleAddCategory() {
      this.addCategory = !this.addCategory
      if (this.addCategory) this.selectedCategory = ''
      else this.selectedCategory = this.currentCategory
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
