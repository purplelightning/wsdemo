import React from 'react'
import { connect } from 'react-redux'
import actions from '../store/actions/users'

class Course extends React.Component {
  constructor(props) {
    super(props)
  }

  logout = () => {
    this.props.logout()
  }

  changeCourse = (e)=>{
    this.props.changeCourse(e.target.value)
  }

  render() {
    return (
      <div className="course-wrapper">
        <div className="name">登录的用户名是{this.props.name}</div>
        <div className="course-head">
          <select value={this.props.course} onChange={this.changeCourse}>
            <option value="">全部</option>
            <option value="技术">技术</option>
            <option value="资讯">资讯</option>
            <option value="生活">生活</option>
            <option value="其他">其他</option>
          </select>
        </div>
        <div className="course-list">
          {
            this.props.list.map(v=>{
              return (
                <div>
                  <span>{v.courseName}</span>
                  <span>{v.courseType}</span>
                  <span>{v.coursePrice}</span>
                </div>
              )
            })
          }
        </div>
        <button onClick={this.logout}>退出登录</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    name: state.users.name,
    list: state.users.list,
    course: state.users.course
  }
}

export default connect(mapStateToProps, actions)(Course)