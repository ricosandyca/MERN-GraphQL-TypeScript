import mongoose from 'mongoose'

const Schema = mongoose.Schema

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, { timestamps: true })

export default mongoose.model('Todo', TodoSchema)
