import React, { useState } from 'react'
import Button from '@hi-ui/hiui/es/button'

// hook 形式
const stateDemo = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
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
class ClassStateDemo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  render() {
    return <div>
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
export default stateDemo
export {
  ClassStateDemo
}
