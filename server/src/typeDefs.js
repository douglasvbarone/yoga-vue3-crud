export const typeDefs = /* GraphQL */ `
  type Query {
    products: [Product!]!
    categories: [Category!]!
  }

  type Mutation {
    createProduct(data: ProductCreateInput!): Product
    updateProduct(id: ID!, data: ProductUpdateInput!): Product
    deleteProduct(id: ID!): Product
  }

  type Subscription {
    productCreated: Product
    productUpdated: Product
    productDeleted: Product
  }

  type Product {
    id: ID!
    name: String!
    price: String!
    description: String
    category: Category!
  }

  type Category {
    id: Int
    name: String
    products: [Product]
  }

  input ProductCreateInput {
    name: String!
    price: String!
    category: String!
    description: String
  }

  input ProductUpdateInput {
    name: String
    price: String
    category: String
    description: String
  }
`
