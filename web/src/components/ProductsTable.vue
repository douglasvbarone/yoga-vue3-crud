<template>
  <v-table autocapitalize>
    <thead>
      <tr>
        <th :style="{ width: '30px' }" class="text-left">ID</th>
        <th :style="{ width: '300px' }" class="text-left">Name</th>
        <th :style="{ width: '100px' }" class="text-left">Price</th>
        <th :style="{ width: '300px' }" class="text-left">Description</th>
        <th :style="{ width: '200px' }" class="text-left">Category</th>
        <th :style="{ width: '300px' }" class="text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      <transition-group name="fade-transition">
        <template v-for="product in products" :key="product.id">
          <tr>
            <template v-if="editingProduct && editingProduct.id != product.id">
              <td>{{ product.id }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.description }}</td>
              <td>{{ product.category.name }}</td>
              <td>
                <RowActions
                  @delete="onDelete(product.id)"
                  @edit="onEdit(product)"
                />
              </td>
            </template>
            <template v-else>
              <td class="text-grey">{{ editingProduct.id }}</td>
              <td>
                <v-text-field
                  hide-details
                  :variant="'outlined'"
                  density="comfortable"
                  v-model="editingProduct.name"
                />
              </td>
              <td>
                <v-text-field
                  hide-details
                  :variant="'outlined'"
                  density="comfortable"
                  v-model="editingProduct.price"
                />
              </td>
              <td>
                <v-text-field
                  hide-details
                  :variant="'outlined'"
                  density="comfortable"
                  v-model="editingProduct.description"
                />
              </td>
              <td>
                <category-select
                  :currentCategory="editingProduct.category.name"
                  @update="e => (editingCategory = e)"
                  hide-label
                />
              </td>
              <td>
                <EditActions @save="onSave(product)" @cancel="onCancel()" />
              </td>
            </template>
          </tr>
        </template>
      </transition-group>
    </tbody>
  </v-table>
</template>

<script>
import RowActions from './RowActions.vue'
import EditActions from './EditActions.vue'
import gql from 'graphql-tag'
import CategorySelect from './CategorySelect.vue'

export default {
  props: {
    products: {
      type: Array,
      default: []
    }
  },
  components: { RowActions, EditActions, CategorySelect },
  data: () => ({
    editingProduct: {
      id: null,
      name: '',
      price: '',
      description: '',
      category: {
        name: ''
      }
    },
    editingCategory: ''
  }),
  methods: {
    resetEditing() {
      this.editingProduct = {
        id: null,
        name: '',
        price: '',
        description: '',
        category: {
          name: ''
        }
      }
      this.editingCategory = ''
    },

    async onDelete(id) {
      if (confirm('Are you sure you want to delete this product?'))
        try {
          await this.$apollo.mutate({
            mutation: gql`
              mutation deleteProduct($id: ID!) {
                deleteProduct(id: $id) {
                  id
                }
              }
            `,
            variables: { id }
          })
        } catch (error) {
          console.log(error)
        }
    },
    onEdit(product) {
      this.editingProduct = { ...product }
    },
    onCancel() {
      this.resetEditing()
    },
    async onSave() {
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation updateProduct($id: ID!, $data: ProductUpdateInput!) {
              updateProduct(id: $id, data: $data) {
                id
                name
                price
                description
                category {
                  name
                }
              }
            }
          `,
          variables: {
            id: this.editingProduct.id,
            data: {
              name: this.editingProduct.name,
              price: this.editingProduct.price,
              description: this.editingProduct.description,
              category: this.editingCategory
            }
          }
        })
        this.resetEditing()
      } catch (error) {
        console.dir(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
