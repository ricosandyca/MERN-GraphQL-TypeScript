import axios from 'axios'
import { ApolloError } from 'apollo-server-express'

import config from '../../config'

type ConfigType = {
  app: { getUrl(): string }
}

const { app: { getUrl } }: ConfigType = config
const baseUrl: string = getUrl()

export default {
  Query: {
    todo: (_parent: object, { _id }: { _id: any }) => (
      axios.get(`${baseUrl}/api/todos/${_id}`)
        .then(({ data }) => data)
        .catch(({ response: { data: { message }, status } }) => {
          throw new ApolloError(message, status)
        })
    ),
    todos: () => (
      axios.get(`${baseUrl}/api/todos`)
        .then(({ data }) => data)
        .catch(({ response: { data: { message }, status } }) => {
          throw new ApolloError(message, status)
        })
    )
  },
  Mutation: {
    createTodo: (
      _parent: object,
      { title, description }: { title: string, description: string }) => (
      axios.post(`${baseUrl}/api/todos`, { title, description })
        .then(({ data }) => data)
        .catch(({ response: { data: { message }, status } }) => {
          throw new ApolloError(message, status)
        })
    ),
    updateTodo: (
      _parent: object,
      { _id, title, description }: { _id: any, title: string, description: string }) => (
      axios.put(`${baseUrl}/api/todos/${_id}`, { title, description })
        .then(({ data }) => data)
        .catch(({ response: { data: { message }, status } }) => {
          throw new ApolloError(message, status)
        })
    ),
    deleteTodo: (
      _parent: object,
      { _id }: { _id: any }) => (
      axios.delete(`${baseUrl}/api/todos/${_id}`)
        .then(({ data }) => data)
        .catch(({ response: { data: { message }, status } }) => {
          throw new ApolloError(message, status)
        })
    )
  }
}
