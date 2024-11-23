import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import _ from 'lodash'
import DailyBill from './DailyBill/index.jsx'

function Month() {
  //按月进行数据的分组并进行计算
  const billList = useSelector((state) => state.bill.billList)
  //使用usememo进行数据处理的好处：当依赖项即数据不变时会缓存原先的值 性能更好
  const monthGRoup = useMemo(() => {
    return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'))
  }, [billList])
  const [currentMonthList, setMonthList] = useState([])
  const currentMonthsumdate = useMemo(() => {
    const pay =
      currentMonthList
        .filter((item) => item.type === 'pay')
        .reduce((a, c) => a + c.money, 0) * -1
    const income = currentMonthList
      .filter((item) => item.type === 'income')
      .reduce((a, c) => a + c.money, 0)
    const total = income - pay
    return { pay, income, total }
  })
  //按日期进行数据处理
  const dayGRoup = useMemo(() => {
    const grounpDate = _.groupBy(currentMonthList, (item) =>
      dayjs(item.date).format('YYYY-MM-DD')
    )
    const key = Object.keys(grounpDate)
    return { grounpDate, key }
  }, [currentMonthList])

  //初始化界面显示当前月统计数据
  //只在初始进行
  useEffect(() => {
    const newDate = currentDate
    setMonthList(monthGRoup[newDate] || [])
  }, [monthGRoup])
  //时间选择器开关临时变量
  const [dateVisible, setDateVisible] = useState(false)
  //时间显示状态
  const [currentDate, setCurrentDate] = useState(() => {
    //格式化时间显示
    return dayjs(new Date()).format('YYYY-MM')
  })
  const onConfirm = (date) => {
    //关闭
    setDateVisible(false)
    //获取时间
    const formateDate = dayjs(date).format('YYYY-MM')
    setCurrentDate(formateDate)
    //获取对应时间数据
    //注意当数据为空时赋值一个[]防止其在数据后续计算调用方法时报错
    setMonthList(monthGRoup[formateDate] || [])

    //更新视图
  }
  return (
    <div className="monthlyBill">
      <NavBar className="nav">月度收支</NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div
            className="date"
            onClick={() => {
              setDateVisible(true)
            }}
          >
            <span className="text">
              {/* 更新视图并进行时间格式化 */}
              {currentDate}月账单
            </span>
            <span
              className={classNames({
                arrow: true,
                expand: dateVisible,
              })}
            ></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{currentMonthsumdate.pay}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{currentMonthsumdate.income}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{currentMonthsumdate.total}</span>
              <span className="type">结余</span>
            </div>
          </div>

          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            max={new Date()}
            onCancel={() => {
              setDateVisible(false)
            }}
            onConfirm={onConfirm}
            onClose={() => {
              setDateVisible(false)
            }}
          />
        </div>
        {/* 单日列表  dayGRoup*/}
        {dayGRoup.key.map((item) => {
          return (
            <DailyBill
              key={item}
              date={item}
              grounpDate={dayGRoup.grounpDate[item]}
            ></DailyBill>
          )
        })}
      </div>
    </div>
  )
}
export default Month
