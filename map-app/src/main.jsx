import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  //<StrictMode> disabled due to Mapbox dev double-mount
    <App />
  //</StrictMode>,
)
