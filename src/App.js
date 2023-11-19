
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Login from './Login';
import Register from './Register';
import Portal from './Portal';

import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Home from './Home';
import Grocery from './Grocery';
import Mobiles from './Mobiles';
import Fashion from './Fashion';
import Electronics from './Electronics';
import Furniture from './Furniture';



function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
        <Route path = '/' element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/' element={<Portal />}>
          <Route path="sidebar" element={<Sidebar />} />
          <Route path="topbar" element={<Topbar />} />
         
          <Route path = 'grocery' element={<Grocery/>} />
          <Route path = 'mobiles' element={<Mobiles/>} />
          <Route path = 'fashion' element={<Fashion/>} />
          <Route path = 'electronics' element={<Electronics/>} />
          <Route path = 'furniture' element={<Furniture/>} />
          </Route>
          {/* <Route path="/forget" element={<Forget/>} />
          <Route path="/verification/:id" element={<Verification />} />
          <Route path="/Changepassword/:id" element={<Changepassword/>} /> */}
        </Routes>
    

    </BrowserRouter>
  </div >
  );
}

export default App;
