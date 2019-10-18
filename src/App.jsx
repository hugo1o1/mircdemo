import React from 'react'
import { Theme } from '@hi-ui/classic-theme'
import routeConfig from './routes'
const logoConfig = {
  logoUrl: 'https://xiaomi.github.io/hiui/static/img/logo.png?241e0618fe55d933c280e38954edea05',
  name: 'HIUI',
  url: 'https://xiaomi.github.io/hiui/#/'
}

const loginConfig = {
  name: '叶舟',
  icon: 'user',
  children: [
    <div key='1' style={{ textAlign: 'center', margin: 4, width: '100px' }}>
      <a href='#info'>个人信息</a>
    </div>,
    <div key='2' style={{ textAlign: 'center', margin: 4, width: 100 }}>
      <a href='#logout'>注销</a>
    </div>
  ]
}
class App extends React.Component {
  render () {
    return <Theme routes={routeConfig} logo={logoConfig} login={loginConfig} type='classic' />
  }
}

export default App
