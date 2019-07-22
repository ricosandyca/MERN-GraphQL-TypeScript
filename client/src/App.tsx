import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

import {
  Todos as TodosRoute,
  TodoForm as TodoFormRoute
} from './routes'

const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' })

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={TodosRoute} />
          <Route path='/form' exact component={TodoFormRoute} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
