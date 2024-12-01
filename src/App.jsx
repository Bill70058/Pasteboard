import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ClickBoard } from './component'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ClickBoard />
    </>
  )
}

export default App
