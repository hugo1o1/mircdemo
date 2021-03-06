import React, { Component } from 'react'
import Grid from '@hi-ui/hiui/es/grid'
import Card from '@hi-ui/hiui/es/card'
import { Button, Input, Form } from '@hi-ui/hiui'
import Modal from '@hi-ui/hiui/es/modal'
import './hugo.scss'
import { store } from '../../store/index'
import { deleteTodo, addTodo, changeState } from '../../actions/todos'
import { connect } from 'react-redux'

const { Row, Col } = Grid
const actions = { deleteTodo, addTodo, changeState }

const Todo = (props) => {
  props = props.todo || []
  return (
    <div id={props.id} draggable='true' onDragEndCapture={(e) => store.dispatch(changeState(props.id, e.clientX))}>
      <Card title={props.title} >
        <span >{props.description}</span>
        <br />
        <Button type='line' icon='edit' />
        <Button type='danger' icon='delete' onClick={() => store.dispatch(deleteTodo(props.id))} />
      </Card>
    </div>
  )
}

const TodoList = (props) => {
  props = props.todos || []

  let todoList = []
  for (let i = 0; i < props.length; i++) {
    todoList.push(
      <Todo key={i} todo={props[i]} />
    )
  }

  return todoList
}

class HugoTodos extends Component {
  constructor () {
    super()
    this.form = React.createRef()
    this.state = {

      modalVisible: false,
      form: {
        title: '',
        description: ''
      },
      formRules: {
        title: {
          required: true,
          message: <span style={{ color: '#ccc' }}>输入一个title 是必要的哦</span>,
          trigger: 'onChange'
        },
        description: {
          required: true,
          message: '请输入一些详细信息',
          trigger: 'onChange'
        }
      }

    }
  }

  modalCancle = () => this.setState({
    modalVisible: false,
    form: {
      title: '',
      description: ''
    }
  })
  handleChange (key, e, value, index) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    })
  }
  handleAddSubmit = () => {
    store.dispatch(addTodo(this.state.form))
    this.setState({
      modalVisible: false,
      form: {
        title: '',
        description: ''
      }
    })
  }
  // onDragEnter = (e) => {
  //  e.preventDefault()
  // if(e.relatedTarget)
  // console.log(e.relatedTarget.innerHTML);
  // }
  // handleDragStart =()=>{

  // }

  render () {
    const FormItem = Form.Item
    const { form } = this.state
    const allTodos = this.props.todos.todos
    let todos = []; let doings = []; let dones = []
    allTodos.forEach((v) => {
      switch (v.state) {
        case 'todo':

          todos.push(v)
          break
        case 'doing':

          doings.push(v)
          break

        default:
          dones.push(v)

          break
      }
    })

    return (
      // <div className='mytodos' onDragEnter={(e) => this.onDragEnter(e)}  >
      <div className='mytodos'>

        <div>
          <Row gutter>
            <Col span={6}>
              <div style={{ backgroundColor: '#6edc7d', width: '100%', padding: '16px 0', textAlign: 'center', color: '#fff' }}>todos</div>
              <TodoList todos={todos} />
            </Col>
            <Col span={6}>
              <div style={{ backgroundColor: '#e8a84f', width: '100%', padding: '16px 0', textAlign: 'center', color: '#fff' }}>doing</div>
              <TodoList todos={doings} />
            </Col>
            <Col span={6}>
              <div style={{ backgroundColor: '#b93e56', width: '100%', padding: '16px 0', textAlign: 'center', color: '#fff' }}>done</div>
              <TodoList todos={dones} />
            </Col>
            <Col span={6}>
              <Button size='large' type='primary' icon='plus' onClick={() => this.setState({ modalVisible: true })} style={{ margin: '0 auto' }} >新建</Button>
            </Col>
          </Row>
        </div>
        <Modal
          title='添加todo'
          closeBtn
          visible={this.state.modalVisible}
          onCancel={() => this.modalCancle()}
          footer={[
            <Button key={-1} type='primary' onClick={this.handleAddSubmit}>添加</Button>
          ]}
        >
          <Form ref={this.form} model={form} rules={this.state.formRules} labelWidth='100' labelPlacement='right' showColon={false}>
            <FormItem label='title' field='title' >
              <Input placeholder='todo' onChange={this.handleChange.bind(this, 'title')} />
            </FormItem>
            <FormItem field='description' label='description' >
              <Input
                type='textarea'
                onChange={this.handleChange.bind(this, 'description')}
                placeholder='description'
              />
            </FormItem>
          </Form>
        </Modal>

      </div>
    )
  }
}

export default connect(state => state, actions)(HugoTodos)
