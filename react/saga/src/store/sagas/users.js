import { take, put, call, fork, all, takeEvery} from 'redux-saga/effects'
import * as types from '../actions/actionTypes'
import fetchSmart from '../../common/utils'

function* login(action){
  let { payload } = action
  let res = yield call(fetchSmart, '/users/login', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
  if(res.msg === '登录成功'){
    yield put({type: types.LOG_IN, name: payload.username})
    yield fork(getList)
  }
}

function* changeCourse(action){
  yield fork(getList.bind(this, action.course))
}

function* getList(type){
  let param={
    page:1
  }
  if(type){
    param.type=type
  }
  let res = yield call(fetchSmart, '/course/list', {
    method: 'POST',
    body: JSON.stringify(param)
  })
  if(res.data){
    yield put({type: types.SET_COURSE_LIST, list: res.data})
  }
}

export function* watchLogin(){
  yield takeEvery(types.ASYNC_LOGIN, login)
  yield takeEvery(types.CHANGE_COURSE, changeCourse)
}