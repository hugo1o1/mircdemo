
import Home from '../views/home'
import Table from '../views/table'
import About from '../views/about'
import HookExample from '../views/hook-example'
import EffectExample from '../views/hook-example/effect'
import Hugo from '../views/hugo'
const routeConfig = [
  { name: '首页', path: '/home', component: Home },
  { name: 'hugo', path: '/hugo', component: Hugo },

  {
    name: '新增Hook示例',
    children: [{
      name: '表格展示',
      path: '/demo/table',
      component: Table
    }, {
      name: 'Hook Example',
      children: [{
        name: 'useState',
        path: '/demo/hook/useState',
        component: HookExample
      }, {
        name: 'useEffect',
        path: '/demo/hook/useEffect',
        component: EffectExample
      }]
    }]
  },
  {
    name: '其他',
    children: [{ name: '关于', path: '/about', component: About }]
  }
]
export default routeConfig
