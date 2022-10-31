import React, { useEffect, useState } from 'react'
import './App.css'
import { LeftTabDemo, SimpleDemo } from './demo'

const demos = {
  'tab-bar in left demo': <LeftTabDemo />,
  'simple demo': <SimpleDemo />,
}

const color: Record<keyof typeof demos, [string, string]> = {
  'tab-bar in left demo': ['#161718', '#ffffff'],
  'simple demo': ['#ffffff', '#000000'],
}

const App: React.FC = () => {
  const [demo, setDemo] = useState<keyof typeof demos>('tab-bar in left demo')

  useEffect(() => {
    document.body.style.background = color[demo][0]
    document.body.style.color = color[demo][1]
  }, [demo])

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ height: 30, display: 'flex' }}>
        {(Object.keys(demos) as (keyof typeof demos)[]).map((key) => (
          <div
            style={{ marginLeft: 20, marginRight: 20 }}
            key={key}
            onClick={() => setDemo(key)}
          >
            {key}
          </div>
        ))}
      </div>
      {demos[demo]}
    </div>
  )
}

export default App
