<template>
  <v-app>
    <v-app-bar app>Vue GraphQL CRUD</v-app-bar>

    <v-main>
      <v-container>
        <v-table v-if="products">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.id }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.category.name }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-container>
    </v-main>
  </v-app>
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
