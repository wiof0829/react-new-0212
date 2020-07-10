import request from '@utils/request'
const BASE_URL = '/admin/edu/subject'
export function reqGetSubjectList(page, limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: 'GET'
  })
}
