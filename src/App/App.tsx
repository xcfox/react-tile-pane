import React from 'react'
import { PaneContainer } from '../components/titlePane/container'
import './App.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <PaneContainer
        rootPane={{
          children: [
            { children: <div>hello</div> },
            {
              isRow: true,
              grow: 2,
              children: [
                { children: <div>world</div> },
                { children: <div>world</div> },
                {
                  children: [
                    { children: <div>world</div>, grow: 3 },
                    { children: <div>world</div> },
                  ],
                },
              ],
            },
          ],
        }}
      />
    </div>
  )
}

export default App
