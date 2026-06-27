import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { LiveFeedProvider } from './context/LiveFeedContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LiveFeedProvider>
      <App />
    </LiveFeedProvider>
  </React.StrictMode>,
)
