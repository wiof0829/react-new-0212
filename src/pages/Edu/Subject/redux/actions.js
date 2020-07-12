import { reqGetSubjectList } from '@api/edu/subject'

import { GET_SUBJECT_LIST } from './constants'
// 获取一级分类的同步
const getSubjectListSync = list => ({
  type: GET_SUBJECT_LIST,
  data: list
})

export const getSubjectList = (page, limit) => {
  return dispatch => {
    return reqGetSubjectList(page, limit).then(response => {
      dispatch(getSubjectListSync(response))
      return response
    })
  }
}
