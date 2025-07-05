import './App.css'
import route from './routes/RouteList'
import { RouterProvider } from 'react-router-dom'
import  UserContextProvider  from './UserContext'
function App() {

  return (
    <>
       <UserContextProvider>

<RouterProvider router={route}>
    
  </RouterProvider>    
     </UserContextProvider>

    </>
  )
}

export default App
