import React, { Component } from 'react'
import './index.scss'
export default class MyDrag extends Component {
  handleDrop=() => {
    console.log('test')
  }
  render () {
    return (
      <div>
        <div className='myDrags' onDragEnter={() => this.handleDrop()} >
          dragArea
        </div>
        <div className='test' draggable='true'>test</div>

      </div>

    )
  }
}
