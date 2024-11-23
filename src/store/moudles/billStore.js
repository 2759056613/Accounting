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
  //只有数据改变的逻辑才会写到这里，并不是所有数据处理逻辑都写这
  //比如后面添加新账单和收入时
 setBillList(state,action){
  state.billList=action.payload
 },
 //同步数据提交到redux内
  addBill(state,action){
state.billList.push(action.payload)
  }
}
  }
)
//解构
const {setBillList,addBill}=billStore.actions
const reducer=billStore.reducer
//异步请求方法
const getBillList=()=>{
  return async (dispach)=>{
   const res=await axios.get('http://localhost:8888/ka')
   dispach(setBillList(res.data))
  }
}
//数据提交
const addBillList=(data)=>{
  return async (dispach)=>{
   const res=await axios.post('http://localhost:8888/ka',data)
   dispach(addBill(res.data))
  }
}


export {getBillList,addBillList} 
export default reducer