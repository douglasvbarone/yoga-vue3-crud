import { PrismaClient } from '@prisma/client'

import { createPubSub } from '@graphql-yoga/node'

const pubSub = createPubSub()

const db = new PrismaClient()

export const resolvers = {
  Query: {
    products: async () => db.product.findMany({ include: { category: true } }),
    categories: async () =>
      db.category.findMany({ include: { products: true } })
  },

  Mutation: {
    createProduct: async (
      parent,
      { data: { name, price, category, description } },
      context
    ) => {
      const product = await db.product.create({
        data: {
          name,
          price,
          description,
          category: {
            connectOrCreate: {
              where: {
                name: category
              },
              create: {
                name: category
              }
            }
          }
        },
        include: { category: true }
      })

      pubSub.publish('productCreated', product)

      return product
    },

    updateProduct: async (
      parent,
      { id, data: { name, price, category, description } },
      context
    ) => {
      const product = await db.product.update({
        where: { id: +id },
        data: {
          name,
          price,
          description,

          category: category
            ? {
                connectOrCreate: {
                  where: {
                    name: category
                  },
                  create: {
                    name: category
                  }
                }
              }
            : undefined
        },
        include: { category: true }
      })

      pubSub.publish('productUpdated', product)

      return product
    },

    deleteProduct: async (parent, { id }, context) => {
      const product = await db.product.delete({ where: { id: +id } })

      pubSub.publish('productDeleted', product)

      return product
    }
  },

  Subscription: {
    productCreated: {
      subscribe: () => pubSub.subscribe('productCreated'),
      resolve: payload => payload
    },
    productUpdated: {
      subscribe: () => pubSub.subscribe('productUpdated'),
      resolve: payload => payload
    },
    productDeleted: {
      subscribe: () => pubSub.subscribe('productDeleted'),
      resolve: payload => payload
    }
  }
}
