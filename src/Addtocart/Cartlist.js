import React from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import CheckoutForm from '../Order/CheckoutForm'; 
function Cartlist() {
    const [cartlist, setcartlist] = useState([])
    const [quantities, setQuantities] = useState([]);
    const [initialQuantities, setInitialQuantities] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const id = window.localStorage.getItem('id');
    const [isloading, setloading] = useState(true)
    const [showCheckout, setShowCheckout] = useState(false);
  
    const updateQuantity = (index, value) => {
      const updatedQuantities = [...quantities];
      updatedQuantities[index] = value;
      setQuantities(updatedQuantities);
    };

    useEffect(() => {
      let timeout;
      if (showAlert) {
        timeout = setTimeout(() => {
         
          setShowAlert(false)
        
        }, 3000);
      }
      return () => {
        clearTimeout(timeout);
      };
    }, [showAlert]);
    useEffect(() => {
      const fetchCartItems = async () => {
        try {
          const users = await axios.get(`http://localhost:8000/addtocart/${id}`, {
            headers: {
              Authorization: `${window.localStorage.getItem("token")}`
            }
          });
          setcartlist(users.data);
  
          // Update quantities only if cart list is not empty
          if (users.data.length > 0) {
            const defaultQuantities = users.data.map(item => item.quantity || 1);
            setQuantities(defaultQuantities);
          }
          setloading(false);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchCartItems();
    }, [id]);
  
    useEffect(() => {
        getcartlist();
       

    }, []);
    useEffect(() => {
      if (cartlist.length > 0) {
        const defaultQuantities = cartlist.map((item) => item.quantity || 1);
        setQuantities(defaultQuantities);
        setInitialQuantities(defaultQuantities); // Store initial quantities
      }
    }, [cartlist]);
    const calculateTotalPrice = () => {
      let total = 0;
      cartlist.forEach((item, index) => {
        const priceWithoutCurrency = item.product.price.replace('₹', ''); 
        total += parseInt(priceWithoutCurrency.replace(/,/g, ''), 10) * quantities[index];
      });
      return `₹${total}`; 
    };

    const increaseQuantity = (index) => {
      const updatedQuantities = [...quantities];
      updatedQuantities[index] += 1;
      setQuantities(updatedQuantities);
    };
  
    const decreaseQuantity = (index) => {
      const updatedQuantities = [...quantities];
      if (updatedQuantities[index] > 1) {
        updatedQuantities[index] -= 1;
        setQuantities(updatedQuantities);
      }
    }; 
    
    const handleCheckoutClick = () => {
      setShowCheckout(true);
    };

    let getcartlist = async () => {
        try {
         
            const users = await axios.get(`http://localhost:8000/addtocart/${id}`,{
              headers: {
                  Authorization: `${window.localStorage.getItem("token")}`
              }
          })
            setcartlist(users.data)
           
            setloading(false)
        } catch (error) {
            console.log(error)
        }

    }
    const removeFromCart = async (productId) => {
        try {
          await axios.delete(`http://localhost:8000/addtocart/${id}/${productId}`,{
            headers: {
                Authorization: `${window.localStorage.getItem("token")}`
            }
        });
          console.log(productId)
          const updatedWishlist = cartlist.filter((item) => item.product._id !== productId);
          console.log(updatedWishlist)
       setcartlist(updatedWishlist);
       setShowAlert(true)
     getcartlist()
        } catch (error) {
          console.error(error);
        }
      };
    const productData = cartlist[0]?.product;
    return (
        <>
         {isloading ? (<div class="col d-flex justify-content-center" >
                <h1 style={{ color: "tomato", maxwidth: "10rem", fontSize: "40px", fontFamily: "cursive" }}>Loading</h1>
            </div>
            ) :  cartlist.length === 0 ?(
                    <>
                    <h2 className="d-flex justify-content-center align-items-center"  style={{ fontSize: "18px", fontFamily: "cursive" }}>Your Cart list is empty</h2>
                    <div className="d-flex justify-content-center"><Link to="/">
                  <button className="btn btn-primary mt-2"> Add items </button></Link>
</div>
                   
                    </>
                    )
:(  
<>
  {showCheckout ? (
  <CheckoutForm cartItems={cartlist} calculateTotalPrice={calculateTotalPrice}   quantities={initialQuantities}/>
) :(
<>
< div className="d-flex justify-content-end mt-2 mr-3"><Link to="/">
                  <button className="btn btn-primary mt-2"> Add items </button></Link>
</div>
    <div className="container">
      
      <div className="row">
        {cartlist.length > 0 && cartlist.map((item, index) => (
          <div key={index}  className="col-lg-4 mb-4" >
            <div className="card h-100">
              <img src={item.product.imageURL} className="card-img-top" alt={item.product.name} />
              <div className="card-body">
                <h5 className="card-title">{item.product.name}</h5>
                <p className="card-text">{item.product.description}</p>
                <p className="card-text"style={{color:"black"}}>Price: {item.product.price}</p>
                <div className="d-flex justify-content-between align-items-center">
                <button className="btn btn-link  btn-sm mr-2" onClick={() => decreaseQuantity(index)}>
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <input
                  
                    type="text"
                    value={quantities[index]}
                    onChange={(e) => {
                      const updatedQuantities = [...quantities];
                      updatedQuantities[index] = parseInt(e.target.value) || 1;
                      setQuantities(updatedQuantities);
                    }}
                    className="form-control mr-2 text-center"
                    style={{ width: '70px' }}
                  />
                  <button className="btn btn-link btn-sm mr-2" onClick={() => increaseQuantity(index)}>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
          <button className='btn btn-outline-primary' onClick={() => removeFromCart(item.product._id)}>Remove from Cart</button>
        </div>
               
             
              </div>
            </div>
          </div>
        ))}
         <div>
         <h4 style={{color:"black",fontFamily:"cursive",margin: "0" }}>Total Price: {calculateTotalPrice()}</h4>
         <button className="btn btn-outline-success mt-3 mb-3" onClick={handleCheckoutClick}>
              Checkout
            </button>
   
  </div>
  {showAlert && (<div className="alert alert-warning alert-dismissible fade show top-right-alert" >
          <span>Removed from Cart</span></div>)}

      </div>
  
      </div>
      {showCheckout && (
        
          <CheckoutForm cartItems={cartlist} calculateTotalPrice={calculateTotalPrice} />
      
        )}

  
</>
          )}
        </>
      )}
    </>
  );
}

export default Cartlist