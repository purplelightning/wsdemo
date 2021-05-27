import { take, put, call, fork, all, takeEvery} from 'redux-saga/effects'
import * as types from '../actions/actionTypes'
import fetchSmart from '../../common/utils'

function* login(action){
  console.log('saga---login')
  console.log(action)
  let { payload } = action
  console.log(payload)
  try {
    let res = yield call(fetchSmart, '/users/login', {
      method: 'POST',
      body: JSON.stringify(payload.params)
    })
  }catch{

  }
}

function* changeCourse(action){
  let {payload} = action
  try{

  }catch{
    
  }
}

export function* watchLogin(){
  yield takeEvery(types.ASYNC_LOGIN, login)
  yield takeEvery(types.CHANGE_COURSE, changeCourse)
}