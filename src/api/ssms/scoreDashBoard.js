import request from '@/utils/request'

// 查询分数详情列表
export function getScoreDashBoardInfo(query) {
  return request({
    url: '/ssms/scoreDashBoard/info',
    method: 'get',
    params: query
  })
}