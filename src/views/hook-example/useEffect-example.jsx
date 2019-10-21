import React, { useState, useEffect } from 'react'
import Button from '@hi-ui/hiui/es/button'
import fetch from 'node-fetch'
// hook 形式
const effectDemo = () => {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  useEffect(() => {
    // 可执行任何有副作用的代码，如：数据请求、日志操作等等
    // 模拟一个延时任务
    console.log('effect 执行')
    fetch('n://easy-mock.com/mock/5c1b42e3fe5907404e6540e9/hiui/select/options?text=xiaomi').then((res) => {
      res.json().then((d) => {
        setData(d.data)
      })
    })
  }, [data])
  return (
    <div>
      {
        data.map((m, n) => {
          return <h4 key={n}>{m.title}</h4>
        })
      }
      <p>You clicked {count} times</p>
      <Button
        type='primary'
        onClick={() => {
          setCount(count + 1)
        }}
      >
        Click
      </Button>
    </div>
  )
}

// class 形式
class ClassEffectDemo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0,
      data: []
    }
  }
  componentDidMount () {
    fetch('https://easy-mock.com/mock/5c1b42e3fe5907404e6540e9/hiui/select/options?text=xiaomi').then((res) => {
      res.json().then((d) => {
        this.setState({
          data: d.data
        })
      })
    })
  }
  render () {
    return <div>
      {
        this.state.data.map((m, n) => {
          return <h4 key={n}>{m.title}</h4>
        })
      }
      <p>You clicked {this.state.count} times</p>
      <Button
        type='primary'
        onClick={() => {
          this.setState({
            count: this.state.count + 1
          })
        }}
      >
        Click
      </Button>
    </div>
  }
}
export default effectDemo
export {
  ClassEffectDemo
}
