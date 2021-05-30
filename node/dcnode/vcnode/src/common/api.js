export const baseUrl = ' https://cnodejs.org/api/v1'

export default {
  getTopic: (params) => {
    return `/topics?tab=${params.tab}&page=${params.page ? params.page : 1}&limit=${params.limit ? params.limit : 20}`
  },
  getTopicDetail: (params) => {
    return `/topic/${params.id}`
  },
  addTopic: '/topics'
}