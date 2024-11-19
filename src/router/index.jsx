//引入路由组件
import Layout from '@/pages/Layout'
import Month from '@/pages/Month'
import New from '@/pages/New'
import Year from '@/pages/Year'
//设置案例主要路由关系
import { createBrowserRouter } from 'react-router-dom'
const router = createBrowserRouter([
  //一级路由 Layout new
  {
    path: '/',
    element: <Layout></Layout>,
    //设置二级路由
    children: [
      {
        //默认展示
        index: true,
        element: <Month></Month>,
      },
      {
        path: 'year',
        element: <Year></Year>,
      },
    ],
  },
  {
    path: '/new',
    element: <New></New>,
  },
])
export default router
