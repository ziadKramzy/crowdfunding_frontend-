import './App.css'
import route from './routes/RouteList'
import { RouterProvider } from 'react-router-dom'
function App() {

  return (
    <>
<RouterProvider router={route}>
  </RouterProvider>    
    </>
  )
}

export default App
