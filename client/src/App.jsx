import './App.css'
import Signup from './Pages/Signup'
import Otp from './Pages/Otp'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'


function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:
      <><Signup/></>
    },
    {
      path:"/otp",element:<><Otp/></>
    }
  ])
  return (
    <div className='min-h-screen min-w-screen bg-gray-50'>
      <Toaster />
      <RouterProvider router={router} />
    </div>
  )
}

export default App









