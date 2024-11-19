import { createRoot } from 'react-dom/client'
import router from '@/router'
import { RouterProvider } from 'react-router-dom'
//导入定制主题文件
import '@/theme/theme.css'
//注入redux
import store from '@/store/index'
import { Provider } from 'react-redux'
createRoot(document.getElementById('root')).render(
  //配置路由
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
)
