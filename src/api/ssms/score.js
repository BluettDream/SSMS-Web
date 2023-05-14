import request from '@/utils/request'

// 查询分数信息列表
export function listScore(query) {
  return request({
    url: '/ssms/score/list',
    method: 'get',
    params: query
  })
}

// 查询分数信息详细
export function getScore(scoreId) {
  return request({
    url: '/ssms/score/' + scoreId,
    method: 'get'
  })
}

// 新增分数信息
export function addScore(data) {
  return request({
    url: '/ssms/score',
    method: 'post',
    data: data
  })
}

// 修改分数信息
export function updateScore(data) {
  return request({
    url: '/ssms/score',
    method: 'put',
    data: data
  })
}

// 删除分数信息
export function delScore(scoreId) {
  return request({
    url: '/ssms/score/' + scoreId,
    method: 'delete'
  })
}

// 查询分数面板
export function getScorePanelInfo(query) {
  return request({
    url: '/ssms/score/panelInfo',
    method: 'get',
    params: query
  })
}
