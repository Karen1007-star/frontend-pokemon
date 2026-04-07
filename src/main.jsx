import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './cssTailwind.css'
import CRUD  from './CRUD'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CRUD/> 
  </StrictMode>,
)
