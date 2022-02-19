import instance from './http.js'


const originAPi = {
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

const expressApi = {
  // API接口
  getApiPage: () => {
    return instance.get('/apipage')
  },
  //测试接口
  getInfo: () => {
    return instance.get('/user/test')
  },

  // 用户接口
  getLogin: (params) => {
    return instance.post(`/user/signin`, params)
  },
  getRegister: (params) => {
    return instance.post(`/user/signup`, params)
  },
  uploadAvatar: (data) => {
    return instance.post('/user/uploadAvatar', data,
    {header: {'content-type':'multipart/form-data'}})
  },
  //topic接口
  getTopic: (params) => {
    return instance.get(`/topic/list?tab=${params.tab}&page=${params.page ? params.page : 1}&pageSize=${params.limit ? params.limit : 20}`)
  },
  getTopicDetail: (params) => {
    return instance.get(`/topic/getDetail?id=${params.id}`)
  },
  addTopic: (params) => instance.post('/topic/addTopic', params),
  updateTopic: (params) => instance.post('/topic/updateTopic', params),
  deleteTopic: (params) => instance.post('/topic/deleteTopic', params),

  //收藏接口
  getTopicCollections: () => instance.get(`/collection/list`),
  handleFav: (params) => instance.post(`/collection/handleFav`, params),

  //添加评论，回复
  addReply: (params) => instance.post(`/topic/addReply`, params),

  //工具接口
  uploadBill:(param) => instance.post('/tool/uploadBill', param),
  handlePdf:() => instance.post('/tool/handlePdf', {}),
  downloadExcel:() => instance.post('/tool/handleExcel', {}),
  ptoexc:(param) => instance.post('/tool/ptoexc', param),
  handleZip:() => instance.post('/tool/handleZip', {}),
  uploadZip:(param) => instance.post('/tool/uploadZip', param),

  //爬虫接口
  handleSpider: () => instance.get('/spider/handleSpider', {}),
  pushReq: () => instance.get('/spider/pushReq', {}),
  crawMooc: (url, type) => {
    if(type){
      return instance.get(`/craw/crawMooc?courseUrl=${url}&type=${type}`)
    }
    return instance.get(`/craw/crawMooc?courseUrl=${url}`)
  },
  crawManga: (url, type) => {
    return instance.get(`/craw/crawManga?url=${url}&type=${type}`)
  }
}

export default expressApi