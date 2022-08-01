<template>
  <v-container>
    <v-toolbar>
      <v-btn :to="{ name: 'newProduct' }">
        <v-icon icon="mdi-plus" />Add
      </v-btn>
      <v-spacer />
      <v-text-field
        v-model="filter"
        label="Filter"
        hide-details
        variant="outlined"
        density="comfortable"
        prepend-inner-icon="mdi-magnify"
        :style="{ maxWidth: '300px' }"
        clearable
      />
    </v-toolbar>
    <products-table :products="items" />
    <router-view />
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import ProductsTable from '../components/ProductsTable.vue'

export default {
  name: 'ProductsView',
  data: () => ({
    filter: ''
  }),
  computed: {
    items() {
      if (this.products)
        return this.products.filter(
          product =>
            product.name.toLowerCase().includes(this.filter.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(this.filter.toLowerCase()) ||
            product.category.name
              .toLowerCase()
              .includes(this.filter.toLowerCase())
        )
      else return []
    }
  },
  apollo: {
    products: {
      query: gql`
        query {
          products {
            id
            name
            description
            price
            category {
              id
              name
            }
          }
        }
      `,
      subscribeToMore: {
        document: gql`
          subscription {
            productCreated {
              id
              name
              description
              price
              category {
                id
                name
              }
            }
          }
        `,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev
          const product = subscriptionData.data.productCreated
          return {
            ...prev,
            products: [...prev.products, product]
          }
        }
      }
    },
    $subscribe: {
      productDeleted: {
        query: gql`
          subscription {
            productDeleted {
              id
            }
          }
        `,
        result() {
          this.$apollo.queries.products.refetch()
        }
      },
      productUpdated: {
        query: gql`
          subscription {
            productUpdated {
              id
            }
          }
        `,
        result() {
          this.$apollo.queries.products.refetch()
        }
      }
    }
  },
  components: { ProductsTable }
}
</script>
