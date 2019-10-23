const initialState = {
  todos: [
    {
      title: '迁站',
      state: 'todo',
      id: 0,
      description: 'mi-portable-mouse 从台湾签到香港'
    },
    {
      title: '迁站',
      state: 'doing',
      id: 1,
      description: 'mi-portable-mouse 从台湾签到香港'
    },
    {
      title: '迁站',
      state: 'done',
      id: 2,
      description: 'mi-portable-mouse 从台湾签到香港'
    }
  ]
}

// reducers 中都是一些纯函数·

export default function Todos (state = initialState, action = {}) {
  switch (action.type) {
    case 'ADD_TODO':
      const todo = Object.assign({}, action.text, { id: action.id, state: action.state })
      const todos = state.todos.concat(todo)
      return Object.assign({}, state, { todos })

    case 'DELETE_TODO': {
      const todos = state.todos.filter((e) => { return (e.id !== action.id) })
      return Object.assign({}, state, { todos })
    }
    case 'EDIT_TODO':
      return state.map((todo, index) =>
        action.index === index ? { text: todo.text, completed: !todo.completed }
          : todo
      )
    default:
      return state
  }
}
