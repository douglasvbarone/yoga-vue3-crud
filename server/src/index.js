import { createServer } from '@graphql-yoga/node'
import { resolvers } from './resolvers'
import { typeDefs } from './typeDefs'

const server = createServer({
  schema: {
    typeDefs,
    resolvers
  }
})

server.start()
