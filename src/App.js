
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Login from './LoginRegister/Login';
import Register from './LoginRegister/Register';
import Portal from './Portal/Portal';
import Topbar from './Portal/Topbar';
import Sidebar from './Portal/Sidebar';
import Home from './Components/Home';
import Grocery from './Components/Grocery';
import Mobiles from './Components/Mobiles';
import Fashion from './Components/Fashion';
import Electronics from './Components/Electronics';
import Furniture from './Components/Furniture';
import Wishlist from './Wishlist/Wishlist';
import Cartlist from './Addtocart/Cartlist';
import Profile from './LoginRegister/Profile';
import Checkout from './Order/Checkout';
import OrderList from './Order/OrderList';
import Forget from './Password/Forget';
import Verification from './Password/Verification';
import Changepassword from './Password/ChangePassword';



function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
        
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/' element={<Portal />}>
          <Route path="sidebar" element={<Sidebar />} />
          <Route path="topbar" element={<Topbar />} />
          <Route index element={<Home />} />
          <Route path = 'products/grocery' element={<Grocery/>} />
          <Route path = 'products/mobiles' element={<Mobiles/>} />
          <Route path = 'products/fashion' element={<Fashion/>} />
          <Route path = 'products/electronics' element={<Electronics/>} />
          <Route path = 'products/furniture' element={<Furniture/>} />
          <Route path = 'wishlist/wishlist' element={<Wishlist/>} />
          <Route path = 'cart/cart' element={<Cartlist/>} />
          <Route path = 'users/profile' element={<Profile/>} />
          <Route path = 'order/orderlist' element={<OrderList/>} />

          </Route>
          <Route path = '/cart/checkout' element={<Checkout/>} />
          <Route path="users/forget" element={<Forget/>} />
          <Route path="users/verification/:id" element={<Verification/>} />
          <Route path="users/Changepassword/:id" element={<Changepassword/>} />
        </Routes>
    

    </BrowserRouter>
  </div >
  );
}

export default App;
