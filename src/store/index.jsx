import { configureStore } from '@reduxjs/toolkit'
import billstore from './moudles/billStore'

const store = configureStore({
  reducer: {
    //bill
    bill: billstore,
  },
})
export default store
