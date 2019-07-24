import React from 'react'
import { graphql, compose } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Link } from 'react-router-dom'

interface ITodo {
  _id: string
  title: string
  description: string
}

interface IData {
  todos: ITodo[]
  loading: boolean
}

interface IProps {
  data: IData
  mutate: any
}

class Todos extends React.Component<IProps> {
  deleteTodo = (id: any) => {
    this.props.mutate({
      variables: { _id: id },
      refetchQueries: [{ query: queries.getTodos }]
    })
  }

  render() {
    const { loading }: { loading: boolean } = this.props.data

    return (
      <div className='container'>
        {
          !loading
          ? (
            <ul className='collection with-header'>
              <React.Fragment>
                <li className='collection-header'><h4>Todo Lists</h4></li>
                {this.props.data.todos.map((todo: ITodo) => (
                  <li
                    className='collection-item'
                    key={todo._id}>
                    <div>
                      {todo.title}
                      <span
                      className='secondary-content red-text'
                      onClick={() => this.deleteTodo(todo._id)}>
                        <i className='material-icons'>delete</i>
                      </span>
                    </div>
                  </li>
                ))}
              </React.Fragment>
            </ul>
          )
          : (
            <div>Please wait...</div>
          )
        }
        <Link
          className='btn-floating btn-large red right'
          to='/form'
          >
          <i className='material-icons'>add</i>
        </Link>
      </div>
    )
  }
}

const queries = {
  getTodos: gql`
    query {
      todos {
        _id
        title
        description
      }
    }
  `
}

const mutations = {
  deleteTodo: gql`
    mutation deleteTodo($_id: ID!){
      deleteTodo(_id: $_id) {
        _id
        title
        description
      }
    }
  `
}

export default compose(
  graphql(mutations.deleteTodo),
  graphql(queries.getTodos)
)(Todos)
