import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'
import ScrollbarContainer from './components/ScrollbarContainer.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopContextProvider>
      <ScrollbarContainer>
      <App />
      </ScrollbarContainer>
    </ShopContextProvider>
  </BrowserRouter>,
)
