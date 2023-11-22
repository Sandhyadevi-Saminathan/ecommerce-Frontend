
import '../Css/Home.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Searchbox from '../SearchFilter/Searchbox';
import Filter from '../SearchFilter/Filter';
import WishlistButton from '../Wishlist/WishlistButton';
import AddToCart from '../Addtocart/AddToCart';

function Home() {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  
  const id = localStorage.getItem('ID');
  useEffect(() => {
    fetchUsers()
    checkUserLogin();
    setLoading(true)
}, [])
const closePopup = () => {
  setPopupMessage('');
};

const checkUserLogin = () => {
    const token = window.localStorage.getItem('token');
    setIsLoggedIn(!!token); 
    console.log(isLoggedIn)
  };
  const handleFilter = (filterType) => {
    console.log(filterType);
    let filtered = [...products];

    switch (filterType) {
      case 'atoz':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'ztoa':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
        case 'lowtohigh':
      filtered.sort((a, b) => extractPrice(a.price) - extractPrice(b.price));
      break;
    case 'hightolow':
      filtered.sort((a, b) => extractPrice(b.price) - extractPrice(a.price));
      break;    
      
      default:
        break;
    }

    setFilteredProducts(filtered);
  };
  const extractPrice = (price) => {
   
    return parseFloat(price.replace(/[^0-9.]/g, ''));
  };


let fetchUsers = async () => {
    try {
        let userData = await axios.get(" http://localhost:8000/general-products")
        console.log(userData.data);
        setProducts(userData.data)
        setFilteredProducts(userData.data);
        setLoading(false);
        
    } catch (error) {
        console.log('error')
    }
}
const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };


  return (
   
    <div className="container">
      
      <div className="row">
      <div className="search-filter-container">
       <Searchbox handleSearch={handleSearch} />
       <Filter handleFilter={handleFilter} />
       </div>
       <div className="mt-3"></div>
       {loading ? (
        <p className="text-center" style={{fontSize:"30px",fontFamily:"cursive"}}>Loading...</p>
      ) : 
    filteredProducts.length === 0 ? (
        <p className="text-center">No records found</p>
      ) : (
        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product._id} className="col-lg-4 mb-4">
              <div className="card h-100">
              <img src={product.imageURL} className="card-img-top" alt={product.name} style={{width:"100px"}} />
              <div className="card-body">
                <h5 className="card-title" >{product.name}</h5>
                <p className="card-text" >{product.description}</p>
                <p className="card-text-price" >Price: {product.price}</p>
                <div className="d-flex justify-content-between align-items-center mt-3">
  
  <WishlistButton 
                  product={product} 
                  userId={localStorage.getItem('id')} 
                  isLoggedIn={isLoggedIn} 
                />
                <AddToCart 
                product={product}
                userId={localStorage.getItem('id')}
                isLoggedIn={isLoggedIn}
              />
</div>

              </div>


              </div>
            </div>
          ))}
        </div>
      )}
         
      </div>
     
    </div>
    
    
  );
}

export default Home;
