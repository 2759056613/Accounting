import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
const billStore=createSlice(
  {
    name:'bill',
   //初始化数据 
   initialState:{
  billList:[]
   },
//同步修改方法
reducers:{
 setBillList(state,action){
  state.billList=action.payload
 }
}
  }
)
//解构
const {setBillList}=billStore.actions
const reducer=billStore.reducer
//异步请求方法
const getBillList=()=>{
  return async (dispach)=>{
   const res=await axios.get('http://localhost:8888/ka')
   dispach(setBillList(res.data))
  }
}


export {getBillList} 
export default reducer