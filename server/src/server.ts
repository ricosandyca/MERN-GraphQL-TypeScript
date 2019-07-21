import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server-express'

import config from './config'
import schema from './app/schema'
import * as routes from './routes'

const app = express()
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

app.listen(PORT, () => console.log('Server running on port', PORT))
