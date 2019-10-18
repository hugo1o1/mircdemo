import React, { Component } from 'react'
import Grid from '@hi-ui/hiui/es/grid'
import Card from '@hi-ui/hiui/es/card'

import './hugo.scss'
import { store } from '../../store/index'


const { Row, Col } = Grid
const { getState, dispatch } = store

const Todo = (props) => {

  return (
    <Card title={props.title}>
      <span>{props.description}</span>
    </Card>
  )
}

const TodoList = (props) =>{
 props.forEach(currentItem => {
   
 })
 
}

export default class HugoTodos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...getState()
    }


  }

  componentDidMount() {
    console.log(getState())
  }






  render() {
    return (
      <div className="mytodos">
        <div>
          <Row gutter={true}>
            <Col span={6}>
              <div style={{ backgroundColor: '#6edc7d', width: '100%', padding: '16px 0', textAlign: 'center', color: '#fff' }}>todos</div>
              <br />

              <br />
              <Card title="标题">
                <span>普通 Card</span>
              </Card>
              <br />
              <Card title="标题">
                <span>普通 Card</span>
              </Card>
            </Col>
            <Col span={6}>
              <div style={{ backgroundColor: '#e8a84f', width: '100%', padding: '16px 0', textAlign: 'center', color: '#fff' }}>doing</div>
            </Col>
            <Col span={6}>
              <div style={{ backgroundColor: '#b93e56', width: '100%', padding: '16px 0', textAlign: 'center', color: '#fff' }}>done</div>
            </Col>
          </Row>
        </div>

      </div>
    )
  }
}


