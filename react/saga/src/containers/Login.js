import React from 'react'
import {connect} from 'react-redux'
import actions from '../store/actions/users'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      pwd: ''
    }
  }

  setData = (e) => {
    const type = e.target.type === 'text' ? 'name' : 'pwd'
    this.setState({
      [type]: e.target.value
    })
  }

  submitForm = () => {
    const params = {
      username: this.state.name,
      password: this.state.pwd
    }
    this.props.doLogin(params)
  }

  render() {
    return (
      <div className="login-wrapper">
        <div className="login">
          <div className="title">1111111</div>
          <div className="item">
            <input className="myinput" type="text" placeholder="手机号/用户名"
              value={this.state.name} onChange={this.setData} />
          </div>
          <div className="item">
            <input className="myinput" type="password" placeholder="密码"
              value={this.state.pwd} onChange={this.setData} />
          </div>
        </div>
        <button onClick={this.submitForm}>登录</button>
      </div>
    )
  }
}

export default connect(()=>{}, actions)(Login)