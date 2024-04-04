import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Details from './components/Details.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'


const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  errorElement: <NotFoundPage />,
}, {
  path: '/pokemon/:id',
  element: <Details />,
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
