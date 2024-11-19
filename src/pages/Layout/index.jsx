import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getBillList } from '@/store/moudles/billStore'
import { TabBar } from 'antd-mobile'
import {
  BillOutline,
  AddCircleOutline,
  CalculatorOutline,
} from 'antd-mobile-icons'
import './index.scss'

//tab栏数据
const tabs = [
  {
    //默认路由
    key: '/',
    title: '月度账单',
    icon: <BillOutline />,
  },
  {
    key: '/new',
    title: '记账',
    icon: <AddCircleOutline />,
  },
  {
    key: '/year',
    title: '年度账单',
    icon: <CalculatorOutline />,
  },
]

function Layout() {
  const dispatch = useDispatch()
  //初始化异步请求数据
  useEffect(() => {
    dispatch(getBillList())
  }, [dispatch])
  const Navigate = useNavigate()
  const switchRoute = (path) => {
    //路由跳转
    Navigate(path)
  }
  return (
    <div className="layout">
      {/* 二级路由出口 !*/}
      <div className="container">
        <Outlet></Outlet>
      </div>
      <div className="footer">
        <TabBar onChange={switchRoute}>
          {tabs.map((item) => (
            <TabBar.Item
              key={item.key}
              icon={item.icon}
              title={item.title}
            />
          ))}
        </TabBar>
      </div>
    </div>
  )
}
export default Layout
