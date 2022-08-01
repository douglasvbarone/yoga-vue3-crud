<template>
  <q-table title="Products" :rows="products" :columns="columns" row-key="name">
  </q-table>
</template>

<script>
export default {
  name: "ProductsView",
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    columns: [
      {
        name: "name",
        label: "Name",
        align: "left",
        sortable: true,
        field: "name",
      },
      {
        name: "description",
        label: "Description",
        align: "left",
        sortable: true,
        field: "description",
      },
      {
        name: "price",
        label: "Price",
        align: "right",
        sortable: true,
        field: "price",
      },
      {
        name: "category",
        label: "Category",
        align: "left",
        sortable: true,
        field: (row) => row.category.name,
      },
    ],
  }),
};
</script>

<style lang="scss" scoped></style>
