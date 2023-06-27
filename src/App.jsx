import { useState } from 'react'
import "antd/dist/antd.min.js"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter ,Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ItemsPage from './pages/ItemsPage'
import Cartpage from './pages/Cartpage'
import BillsPage from './pages/BillsPage'
import Login from './pages/Login'
import { useSelector,useDispatch } from 'react-redux'
function App() {
  const [count, setCount] = useState(0);
  const user = useSelector(state=>state.user.user);
  

  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={user?<HomePage/>:<Login/>}/>
        <Route path ='/items' element ={user?<ItemsPage/>:<Login/>}/>
        <Route path='/cart' element={user?<Cartpage/>:<Login/>}/>
        <Route path='/bills' element={user?<BillsPage/>:<Login/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
