import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function OrderList({ }) {
    const [isloading, setloading] = useState(true)
    const [orderDetails, setOrderDetails] = useState(null); // State to store fetched order details
    const userId = window.localStorage.getItem('id');
    useEffect(() => {
        const fetchOrderDetails = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/order/orderlist/${userId}`, {
              headers: {
                Authorization: `${window.localStorage.getItem('token')}`,
              },
            });
            setOrderDetails(response.data);
            setloading(false)
            console.log(response.data)
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchOrderDetails();
      }, [userId]);
    
    
  return (
    <>
    {isloading ? (<div class="col d-flex justify-content-center" >
    <h1 style={{ color: "tomato", maxwidth: "10rem", fontSize: "40px", fontFamily: "cursive" }}>Loading</h1>
</div>) : (


orderDetails.length === 0 ?
        (< >
        <h2 className="d-flex justify-content-center align-items-center"  style={{ fontSize: "18px", fontFamily: "cursive" }}>Your Orderlist is empty</h2>
        <div className="d-flex justify-content-center"><Link to="/">
      <button className="btn btn-primary mt-2"> Buy Now </button></Link>
</div>
       
        </>)
:
<>
<div className="d-flex justify-content-end mt-2 mr-3"><Link to="/">
                  <button className="btn btn-primary mt-2 mr-3"> Back to home </button></Link>
</div>
<div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }} >
{orderDetails.map((order, index) => (
    <div key={index} style={{ justifyContent: 'center',  marginBottom: '20px'}}>
        <div style={{ maxWidth: '800px', width: '100%', display: 'flex', gap: '20px', padding: '20px', border: '1px solid #ccc' }}>
        <div style={{ flex: '1', borderRight: '1px solid #ccc', paddingRight: '20px' }}>
        <h3 style={{fontFamily:"cursive",color:"tomato" }}  >Ordered Items</h3>
        <br></br>

        {order.cartItems.map((item, index) => (
          <ul key={index}>
            <h4 style={{fontFamily:"cursive",color:"black" }} >Item Name: {item.name}</h4>
            <h5 style={{fontFamily:"cursive",color:"salmon" }}  >Price: {item.price}</h5>
            <h6 style={{fontFamily:"cursive",color:"salmon" }}>Quantity: {item.quantity}</h6>
          </ul>
        ))}
   
      
    </div>
       
          <div style={{ flex: '1'}}>
          
      <h3 style={{fontFamily:"cursive",color:"black" }}> Shipping Details</h3>
      <br/>
     <div style={{fontFamily:"cursive",color:"red" }}>
      <h5 >Name: {order.name}</h5>
      <h5>Email: {order.email}</h5>
      <h5>Phone: {order.phone}</h5>
      <h5>Address: {order.address}</h5>
      </div>
      <br/>
      <h4 style={{fontFamily:"cursive",color:"black" }}>Total Price: {order.totalPrice}</h4>
      <br/>
      <h5 style={{fontFamily:"cursive",color:"black" }}>Status: Order Confirmed</h5>
      </div>
   
    </div>
    </div>
     ))}
     </div>
   </>
    )} 
               
    </>        

  );
}

export default OrderList;
