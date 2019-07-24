import React from 'react'
import { gql } from 'apollo-boost'
import { graphql, compose } from 'react-apollo'

interface IState {
  title?: string
  description?: string
}

interface IProps {
  mutate: any
  history: any
}

class TodoForm extends React.Component<IProps, IState> {
  state: IState = {
    title: '',
    description: ''
  }

  createTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { title, description }: IState = this.state
    this.props.mutate({
      variables: { title, description },
      refetchQueries: [{ query: queries.getTodos }]
    })
      .then(() => this.props.history.push('/'))
      .catch((err: any) => alert(err.message))
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value }: any = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className='container'>
        <form onSubmit={this.createTodo}>
          <h4>TODO Form</h4>
          <label>Title</label>
          <input
            name='title'
            value={this.state.title}
            onChange={this.handleChange}/>
          <label>Description</label>
          <input
            name='description'
            value={this.state.description}
            onChange={this.handleChange}/>
          <input type="submit" value="Submit" />
        </form>
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
  createTodo: gql`
    mutation createTodo($title: String! $description: String!) {
      createTodo(title: $title description: $description) {
        _id
        title
        description
      }
    }
  `
}

export default compose(
  graphql(mutations.createTodo)
)(TodoForm)
