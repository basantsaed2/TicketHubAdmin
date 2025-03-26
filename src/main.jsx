import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { router } from "./Router.jsx"
import { ContextProvider } from './Context/Auth.jsx';
import { Provider } from 'react-redux'; // Import the Provider from react-redux

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
              <ContextProvider>
                <RouterProvider router={router}/>
              </ContextProvider>
  </React.StrictMode>,
)

