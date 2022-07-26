import { createApolloProvider } from '@vue/apollo-option'

import {
  ApolloLink,
  Observable,
  ApolloClient,
  InMemoryCache
} from '@apollo/client/core'
import { split } from '@apollo/client/link/core'
import { HttpLink } from '@apollo/client/link/http'
import { print, getOperationAST } from 'graphql'

class SSELink extends ApolloLink {
  constructor(options) {
    super()
    this.options = options
  }

  request(operation) {
    const url = new URL(this.options.uri)
    url.searchParams.append('query', print(operation.query))

    if (operation.operationName)
      url.searchParams.append(
        'extensions',
        JSON.stringify(operation.operationName)
      )
    if (operation.variables)
      url.searchParams.append('variables', JSON.stringify(operation.variables))

    if (operation.extensions)
      url.searchParams.append(
        'extensions',
        JSON.stringify(operation.extensions)
      )

    return new Observable(sink => {
      const eventsource = new EventSource(url.toString(), this.options)
      eventsource.onmessage = function (event) {
        const data = JSON.parse(event.data)
        sink.next(data)

        if (eventsource.readyState === 2) {
          sink.complete()
        }
      }
      eventsource.onerror = function (error) {
        sink.error(error)
      }
      return () => eventsource.close()
    })
  }
}

const uri = 'http://localhost:4000/graphql'

const sseLink = new SSELink({
  uri
})

const httpLink = new HttpLink({
  uri
})

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
