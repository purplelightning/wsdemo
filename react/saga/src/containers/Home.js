import React from 'react'
import Login from './Login'
import Course from './Course'
import { connect } from 'react-redux'

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="home-wrapper">
        <div className="home">This is Home</div>
          {!!this.props.loginStatus && <Course/> }
          {!this.props.loginStatus && <Login/> }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loginStatus: state.loginStatus
  }
}

export default connect(mapStateToProps)(Home)