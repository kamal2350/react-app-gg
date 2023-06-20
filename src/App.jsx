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
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path ='/items' element ={<ItemsPage/>}/>
        <Route path='/cart' element={<Cartpage/>}/>
        <Route path='/bills' element={<BillsPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
