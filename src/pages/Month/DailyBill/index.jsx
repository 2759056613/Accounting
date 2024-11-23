import '../DailyBill/index.scss'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
//导入中文适配
import { billTypeToName } from '@/contants/index'
//图标组件
import Icon from '@/components/icon/index'
function DailyBill({ date, grounpDate }) {
  //点击切换列表显示
  //声明一个控制显隐的状态
  const [visible, setVisible] = useState(false)
  //传入日期和当日账单数据
  //进行数据处理
  const currentdaysumdate = useMemo(() => {
    const pay =
      grounpDate
        .filter((item) => item.type === 'pay')
        .reduce((a, c) => a + c.money, 0) * -1
    const income = grounpDate
      .filter((item) => item.type === 'income')
      .reduce((a, c) => a + c.money, 0)
    const total = income - pay
    return { pay, income, total }
  })
  //处理日期数据
  const currentdate = dayjs(date).format('MM月DD日')
  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{currentdate}</span>
          <span
            className={classNames('arrow', !visible && 'expand')}
            onClick={() => {
              setVisible(!visible)
            }}
          ></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{currentdaysumdate.pay}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{currentdaysumdate.income}</span>
          </div>
          <div className="balance">
            <span className="money">{currentdaysumdate.total}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
      {/* 单日列表 */}
      <div
        className="billList"
        style={{ display: !visible && 'none' }}
      >
        {grounpDate.map((item) => {
          return (
            <div
              className="bill"
              key={item.id}
            >
              {/* 图标 */}
              <Icon type={item.useFor}></Icon>
              <div className="detail">
                <div className="billType">{billTypeToName[item.useFor]}</div>
              </div>
              <div className={classNames('money', item.type)}>
                {item.money.toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default DailyBill
