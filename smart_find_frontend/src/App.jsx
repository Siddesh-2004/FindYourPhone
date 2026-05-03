import Layout from './Layout'
import Home from "./pages/Home.jsx"
import Landing from './pages/Landing'
import QuestionForPhoneAndLaptop from './pages/QuestionForPhoneAndLaptop.jsx'
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom'


import Result from './pages/Result.jsx'

function App() {
 

  const router=createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout/>} >
      <Route path='' element={<Landing />} />
      <Route path='home' element={<Home/>} />
      <Route path='questions/:device' element={<QuestionForPhoneAndLaptop setRecommendations/>} />
     <Route path='results' element={<Result />} />
      
    </Route>
  ))
  return (
    <RouterProvider router={router} />
  )
}

export default App