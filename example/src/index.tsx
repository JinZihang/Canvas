import React from 'react'
import ReactDOM from 'react-dom/client'
import Canvas from './components/Canvas'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <div>
      <h1>jzh-react-canvas</h1>
      <Canvas canvasWidth={500} canvasHeight={500} resizable={true} />
    </div>
  </React.StrictMode>,
)
