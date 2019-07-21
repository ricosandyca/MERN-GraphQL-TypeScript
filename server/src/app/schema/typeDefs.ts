import { gql } from 'apollo-server-express'

export default gql`
  type Todo {
    _id: ID
    title: String
    description: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    todo(_id: ID!): Todo
    todos: [Todo]
  }

  type Mutation {
    createTodo(title: String! description: String!): Todo
    updateTodo(_id: ID! title: String! description: String!): Todo
    deleteTodo(_id: ID!): Todo
  }
`
