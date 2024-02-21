import React from 'react'
import ReactDOM from 'react-dom/client'
import CountriesApp from './CountriesApp.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './Redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CountriesApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
