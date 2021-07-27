import {takeEvery, put, call, all, race} from 'redux-saga/effects'

import {watchLogin} from './users'

export default function* rootSaga(){
  yield all([watchLogin()])
}