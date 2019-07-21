const app = {
  name: 'MERN + GraphQL + TypeScript',
  port: 4000,
  getUrl: () => `http://localhost:${app.port}`
}

const db = {
  uri: 'mongodb://localhost/graphql-todo'
}

export default { db, app }
