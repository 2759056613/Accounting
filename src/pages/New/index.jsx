import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData, billTypeToName } from '@/contants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBillList } from '@/store/moudles/billStore'
import dayjs from 'dayjs'
const New = () => {
  //准备控制切换指出收入的状态
  const [type, setBilltype] = useState('pay')
  const navigate = useNavigate()
  //保存账单
  //获取金额
  const [money, setMoney] = useState(0)
  const moneyChange = (value) => {
    setMoney(value)
  }
  const dispatch = useDispatch()
  //获取类型
  const [useFor, setUseFor] = useState('')
  const saveBill = () => {
    //手机表单数据
    const data = {
      type: type,
      money: type === 'pay' ? Number(money) * -1 : Number(money),
      date: accountingTime,
      useFor: useFor,
    }
    //提交action
    dispatch(addBillList(data))
  }
  //控制时间选择器打开关闭
  const [dateVisible, setDateVisible] = useState(false)
  const [accountingTime, setAccountingTime] = useState(() => {
    return new Date()
  })
  const onConfirm = (date) => {
    //关闭
    setDateVisible(false)
    //获取时间
    setAccountingTime(date)
  }
  return (
    <div className="keepAccounts">
      <NavBar
        className="nav"
        onBack={() => navigate(-1)}
      >
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(type === 'pay' ? 'selected' : '')}
            onClick={() => setBilltype('pay')}
          >
            支出
          </Button>
          <Button
            className={classNames(type === 'income' ? 'selected' : '')}
            shape="rounded"
            onClick={() => setBilltype('income')}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon
                type="calendar"
                className="icon"
              />
              <span
                className="text"
                onClick={() => setDateVisible(true)}
              >
                {dayjs(accountingTime).format('MM月DD日')}
              </span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={dateVisible}
                onCancel={() => setDateVisible(false)}
                onClose={() => {
                  setDateVisible(false)
                }}
                onConfirm={onConfirm}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={moneyChange}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[type].map((item) => {
          return (
            <div
              className="kaType"
              key={item.type}
            >
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map((item) => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        useFor === item.type ? 'selected' : ''
                      )}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        {/* 收集数据提交action */}
        <Button
          className="btn save"
          onClick={saveBill}
        >
          保 存
        </Button>
      </div>
    </div>
  )
}
export default New
