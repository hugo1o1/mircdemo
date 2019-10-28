let todosCounter = 100
export const addTodo = text => ({
  type: 'ADD_TODO',
  id: todosCounter++,
  state: 'todo',
  text
})
export const deleteTodo = id => ({
  type: 'DELETE_TODO',
  id

})
export const changeState = (id, x) => ({
  type: 'CHANGE_STATE',
  id,
  x
})
