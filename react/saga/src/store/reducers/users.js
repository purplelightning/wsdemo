import * as types from '../actions/actionTypes'

const initState = {
  loginStatus: false,
  name: '',
  course: '',
  list: []
}

export default (state = initState, action) => {
  console.log(action.type)
  switch(action.type){
    case types.LOG_OUT:{
      return initState
    }
    case types.LOG_IN: {
      return {
        ...state, loginStatus: true, name:action.name
      }
    }
    case types.CHANGE_COURSE:{
      return {
        ...state, list: action.list
      }
    }
    default:{
      return state
    }
  }
}