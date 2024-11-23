const Icon = ({ type }) => {
  const BASE_URL =
    'https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/reactbase/ka/'
  return (
    <img
      src={`${BASE_URL + type}.svg`}
      alt="icon"
      style={{
        width: 20,
        height: 20,
      }}
    />
  )
}

export default Icon
