<template>
  <main>{{ products }}</main>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'HomeView',
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
  }
}
</script>
