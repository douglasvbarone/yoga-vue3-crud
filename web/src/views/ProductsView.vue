<template>
  <v-container>
    <v-toolbar>
      <v-btn :to="{ name: 'newProduct' }">
        <v-icon icon="mdi-plus" />Adicionar
      </v-btn>
    </v-toolbar>
    <products-table :products="products" />
    <router-view />
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import ProductsTable from '../components/ProductsTable.vue'

export default {
  name: 'ProductsView',
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
