import { useState } from 'react'
import {MyComponent} from "./components"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
          <h1>Click Me</h1>
          <MyComponent/>
      </div>
    </>
  )
}

export default App
