import { request } from '../utils/request'

export const UPDATE_TABLE_DATAS = 'DEMO/UPDATE_TABLE_DATAS'


export const setDatas = data => ({ type: UPDATE_TABLE_DATAS, payload: data })
export const fetchDatas = params => async dispatch => {
  const ret = await request('/mock/5c1b42e3fe5907404e6540e9/hiui/table/get-datas', {
    method: 'get',
    params
  })

  if (ret.code === 200 && ret.data) {
    const rawDatas = ret.data
    const tableDatas = []
    const columns = rawDatas.columns
    const pageInfo = rawDatas.pageInfo

    rawDatas.data.map(data => {
      tableDatas.push(data)
    })

    dispatch(setDatas({
      columns,
      datas: tableDatas,
      page: pageInfo.page,
      total: pageInfo.total
    }))
  }
}