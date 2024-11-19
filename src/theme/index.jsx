import { useState } from 'react'
function Theme() {
  const [theme, setTheme] = useState({})
  const handleClick1 = () => {
    setTheme({
      token: {
        token: {
          colorPrimary: '#525861',
          colorInfo: '#525861',
          colorSuccess: '#6abe41',
          colorWarning: '#f5222d',
          colorError: '#605c45',
          colorBgBase: '#d1cbcb',
          colorTextBase: '#000000',
          fontSize: 16,
          sizeStep: 4,
          borderRadius: 11,
          wireframe: false,
        },
      },
    })
  }

  return theme
}
export default Theme
