import {
  Todo
} from '../models'

const services = {
  getAllTodos: () => {
    return new Promise((resolve, reject) => {
      Todo.find()
        .then(resolve)
        .catch(reject)
    })
  },
  getSingleTodo: (id: any) => {
    return new Promise((resolve, reject) => {
      Todo.findById(id)
        .then(resolve)
        .catch(reject)
    })
  },
  createTodo: (data: any) => {
    return new Promise((resolve, reject) => {
      const new_todo = new Todo(data)
      new_todo.save()
        .then(resolve)
        .catch(reject)
    })
  },
  updateTodo: (id: string, data: any) => {
    return new Promise((resolve, reject) => {
      Todo.findByIdAndUpdate(id, data, { new: true })
        .then(resolve)
        .catch(reject)
    })
  },
  deleteTodo: (id: string) => {
    return new Promise((resolve, reject) => {
      Todo.findByIdAndRemove(id)
        .then(resolve)
        .catch(reject)
    })
  }
}

export default {
  get: async (req: any, res: any) => {
    try {
      const { todo_id: id }: { todo_id: any } = req.params
      if (id) {
        // Get single todo
        const data = await services.getSingleTodo(id)
        if (!data) throw { message: 'Todo not found', status: 404 }
        res.send(data)
      } else {
        // Get all todos
        const data = await services.getAllTodos()
        res.send(data)
      }
    } catch (err) {
      const status: number = err.status || 500
      const message: string = err.message || 'Unknown error'
      res.status(status).send({ message })
    }
  },

  post: async (req: any, res: any) => {
    try {
      const { title, description } = req.body
      const new_todo = await services.createTodo({ title, description })
      res.send(new_todo)
    } catch (err) {
      const status: number = err.status || 500
      const message: string = err.message || 'Unknown error'
      res.status(status).send({ message })
    }
  },

  put: async (req: any, res: any) => {
    try {
      const { todo_id: id }: { todo_id: any } = req.params
      const { title, description } = req.body
      const update_todo = await services.updateTodo(id, { title, description })
      if (!update_todo) throw { status: 404, message: 'Todo not found' }
      res.send(update_todo)
    } catch (err) {
      const status: number = err.status || 500
      const message: string = err.message || 'Unknown error'
      res.status(status).send({ message })
    }
  },

  delete: async (req: any, res: any) => {
    try {
      const { todo_id: id }: { todo_id: any } = req.params
      const delete_todo = await services.deleteTodo(id)
      if (!delete_todo) throw { status: 404, message: 'Todo not found' }
      res.send(delete_todo)
    } catch (err) {
      const status: number = err.status || 500
      const message: string = err.message || 'Unknown error'
      res.status(status).send({ message })
    }
  }
}
