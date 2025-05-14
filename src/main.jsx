import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ContextProvider } from './Context/Auth.jsx';
import { Provider } from 'react-redux'; // Import the Provider from react-redux
import {AppRouter} from '../src/Router.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
              <ContextProvider>
                <AppRouter/>
              </ContextProvider>
  </React.StrictMode>,
)

