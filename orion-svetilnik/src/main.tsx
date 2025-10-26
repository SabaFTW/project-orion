import React from 'react'
import ReactDOM from 'react-dom/client'
// If App.tsx exists in src/, use:
import App from './App'

// Or, if App.tsx is in a different folder, update the path accordingly, e.g.:
// import App from './components/App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
