import express from 'express'

import {
  Todo as TodoController
} from '../app/controllers'

const router = express.Router()

/**
  * @route /api/todos
  * @desc Todos API
  * @access public
  */
router
  .route('/todos/:todo_id?')
  .get(TodoController.get)
  .post(TodoController.post)
  .put(TodoController.put)
  .delete(TodoController.delete)

export default router
