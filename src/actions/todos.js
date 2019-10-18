let todosCounter = 0
export const toDos = text => ({
  type: 'ADD_TODO',
  id: todosCounter++,
  text
})
