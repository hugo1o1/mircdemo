import React, { Component } from 'react'
import { Grid, Input, Button, Icon, Menu } from '@hi-ui/hiui'
import './home.scss'

const { Row, Col } = Grid

class HomeSearch extends Component {
  constructor(props) {
    super(props)
    this.data = [
      { content: '常用', id: '0' },
      { content: '热门', id: '1' },
      { content: '我的', id: '2' }
    ]
  }

  renderTab() {
    let tabList = []
    for (let i = 0; i < 4; i++) {
      tabList.push(
        <Col key={i} span={6}>
          <div className="tab-item">
            <div className="tab-item__title">标题</div>
            <p className="tab-item__detail">功能简介</p>
          </div>
        </Col>
      )
    }
    return tabList
  }

  render() {
    return (
      <div className="page page--search">
        <div className="search-box">
          <Row justify="center">
            <h3 className="search-guide">Sologn引导文案</h3>
          </Row>
          <Row>
            <Col>
              <Input
                style={{ width: '450px' }}
                append={
                  <Button type="primary">
                    <Icon name="search" />
                  </Button>
                }
                placeholder="Search"
              />
            </Col>
          </Row>
          <Row>
            <Col>热词：</Col>
            <Col>
              <span className='search-hot'>关键词</span>
              <span className='search-hot'>关键词</span>
              <span className='search-hot'>关键词</span>
              <span className='search-hot'>关键词</span>
            </Col>
          </Row>
        </div>
        <div className="tab-box">
          <Menu
            placement="horizontal"
            activeId={'0'}
            data={this.data}
          />
          <div className="tab-content">
            <Row gutter justify="space-between">
              {this.renderTab()}
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeSearch
