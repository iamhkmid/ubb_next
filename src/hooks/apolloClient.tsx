import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, concat, ApolloLink } from '@apollo/client';

const httpLink = new HttpLink({ 
  uri: `${process.env.NEXT_PUBLIC_BE_URL}/graphql`,
  fetch: (uri, options) => {
    return fetch(uri, options).then(response => {
      if (response.status >= 500) {
        return Promise.reject(response.status)
      }
      console.log({response})
      return response
    }).catch(error => {
      return Promise.reject(error)
    });
  }
})

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: sessionStorage.getItem('token') || null,
    }
  }));
  return forward(operation);
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

type TApolloClientProvider = {
  children: React.ReactNode;
}

const ApolloClientProvider:React.FC<TApolloClientProvider> = ({children})=>{
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  ) 
}

export default ApolloClientProvider