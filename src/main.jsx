import { createRoot } from 'react-dom/client'
import './index.css'
import RoutingApp from './RoutingApp.jsx'
import {BrowserRouter} from 'react-router-dom'
import ThemeWrapper from './Context/ThemeContext.jsx'
import AuthWrapper from './Components/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthWrapper>
  <ThemeWrapper>
    <BrowserRouter>
      <RoutingApp />
    </BrowserRouter>
  </ThemeWrapper>  
  </AuthWrapper>
)
