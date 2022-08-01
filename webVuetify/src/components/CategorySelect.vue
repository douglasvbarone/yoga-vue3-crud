<template>
  <div>
    <v-select
      v-if="!addCategory"
      v-model="selectedCategory"
      :items="items"
      placeholder="Select a category"
      :label="hideLabel ? '' : 'Category'"
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
      append-icon="mdi-close"
      @click:append="addCategory = false"
    />
  </div>
</template>
<script>
import gql from 'graphql-tag'

export default {
  name: 'CategorySelect',
  props: {
    currentCategory: {
      type: String
    },
    hideLabel: {
      type: Boolean,
      default: false
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

        if (this.categories.length == 0) {
          this.addCategory = true
        }

        return [
          ...this.categories.map(category => category.name),
          'Add new category'
        ]
      } else return []
    }
  },
  watch: {
    selectedCategory(value) {
      if (value === 'Add new category') {
        this.selectedCategory = ''
        this.addCategory = true
        this.$emit('update', '')
      }
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
