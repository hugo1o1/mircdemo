import { UPDATE_TABLE_DATAS } from '../actions/demo'

const initialState = {
  tableDatas: {
    pageSize: 0,
    total: 0,
    page: 1,
    datas: [],
    columns: []
  }
}

export default (state = initialState, action = {}) => {
  const {
    type,
    payload
  } = action

  switch (type) {
    case UPDATE_TABLE_DATAS:
      const tableDatas = Object.assign({}, initialState.tableDatas, payload)
      return Object.assign({}, state, { tableDatas })
    default:
      return state
  }
}
