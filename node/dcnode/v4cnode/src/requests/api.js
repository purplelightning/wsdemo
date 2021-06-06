import instance from './http.js'


export default {
  //测试接口
  getInfo: () => {
    return instance.get('/user/test')
  },
  getUserInfo: (params) => {
    return instance.post(`/accessToken`, params)
  },
  //topic接口
  getTopic: (params) => {
    return instance.get(`/topics?tab=${params.tab}&page=${params.page ? params.page : 1}&limit=${params.limit ? params.limit : 20}`)
  },
  getTopicDetail: (params) => {
    return instance.get(`/topic/${params.id}`)
  },
  addTopic: (params) => instance.post('/topics', params),
  updateTopic: (params) => instance.post('/topics/update', params),

  //收藏接口
  getTopicCollections: (name) => instance.get(`/topic_collect/${name}`),
  addFav: (params) => instance.post(`/topic_collect/collect`, params),
  cancelFav: (params) => instance.post(`/topic_collect/de_collect`, params),

  //添加评论，回复
  addReply: (topicId, params) => instance.post(`/topic/${topicId}/replies`, params)
}