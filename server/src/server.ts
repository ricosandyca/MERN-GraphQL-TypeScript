import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import path from 'path'
import { ApolloServer } from 'apollo-server-express'

import config from './config'
import schema from './app/schema'
import * as routes from './routes'

const app: any = express()
const dev: boolean = process.env.NODE_ENV !== 'production'
const PORT: any = process.env.PORT || config.app.port
const DB: string = config.db.uri

// Connect to database
mongoose.connect(DB, { useNewUrlParser: true, useFindAndModify: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err))

// Run GraphQL server
const GraphQLServer = new ApolloServer({ schema })
GraphQLServer.applyMiddleware({ app })

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// REST API
app.use('/', routes.web)
app.use('/api', routes.api)

// Set client static folder
if (!dev) {
  app.use(express.static(path.join(__dirname, '../../client/build')))

  app.get('*', (_req: any, res: any) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'client', 'build', 'index.html'))
  })
}

app.listen(PORT, () => console.log('Server running on port', PORT))
