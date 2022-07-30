<template>
  <v-dialog :model-value="true">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card :style="{ width: '400px' }">
          <v-card-title>
            <span class="headline">Add Product</span>
          </v-card-title>
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                v-model="name"
                label="Name"
                :variant="'outlined'"
                required
                :rules="[v => !!v || 'Name is required']"
              />

              <v-text-field
                v-model="price"
                label="Price"
                :variant="'outlined'"
                :rules="[v => !!v || 'Price is required']"
              />
              <v-textarea
                v-model="description"
                label="Description"
                :variant="'outlined'"
              />
              <category-select class="mb-4" @update="e => (category = e)" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="accent"
              flat
              @click="$router.replace({ name: 'products' })"
              >Cancel</v-btn
            >
            <v-btn color="primary" flat @click="createProduct">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script>
import gql from 'graphql-tag'
import CategorySelect from '../components/CategorySelect.vue'
import MoneyInput from '../components/MoneyInput.vue'

export default {
  name: 'NewProductView',
  components: { CategorySelect, MoneyInput },
  data: () => ({
    valid: false,

    name: '',
    price: 0,
    description: '',
    category: ''
  }),

  methods: {
    async createProduct() {
      if (this.valid) {
        try {
          await this.$apollo.mutate({
            mutation: gql`
              mutation createProduct($data: ProductCreateInput!) {
                createProduct(data: $data) {
                  id
                }
              }
            `,
            variables: {
              data: {
                name: this.name,
                price: this.price.toString(),
                description: this.description,
                category: this.category
              }
            }
          })
          this.$router.push({ name: 'products' })
        } catch (e) {
          console.dir(e)
        }
      }
    }
  }
}
</script>
