import { createApolloProvider } from '@vue/apollo-option'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { split } from '@apollo/client/link/core'
import { HttpLink } from '@apollo/client/link/http'
import { getOperationAST } from 'graphql'

import { SSELink } from './classes/SSELink'

const uri = 'http://localhost:4000/graphql'

const sseLink = new SSELink({ uri })

const httpLink = new HttpLink({ uri })

const link = split(
  ({ query, operationName }) => {
    const definition = getOperationAST(query, operationName)

    return (
      definition?.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  sseLink,
  httpLink
)

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link,
  cache,
  uri
})

export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient
})
