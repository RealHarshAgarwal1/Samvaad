import './App.css'
import Signup from './Pages/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'


function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:
      <><Signup/></>
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









