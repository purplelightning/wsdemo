import * as types from './actionTypes'

export default {
  logout(){
    return { type: types.ASYNC_LOGIN }
  },
  doLogin(params){
    return { type: types.ASYNC_LOGIN, payload: params}
  },
  changeCourse(course){
    return { type: types.CHANGE_COURSE, course: course }
  }
}