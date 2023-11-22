import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CheckoutForm({ cartItems, calculateTotalPrice,quantities}) {
    const id = window.localStorage.getItem('id');
    const [isupdating, setupdating] = useState(false);
    const [isloading, setloading] = useState(true)
  ;
    const navigate = useNavigate();
    useEffect(() => {
        getuser()
    }, [])
    let getuser = async () => {
        try {
            const user = await axios.get(`http://localhost:8000/user/${id}`, {
                headers: {
                    Authorization: `${window.localStorage.getItem("token")}`
                }
            })
            formik.setValues(user.data)
            setloading(false)
        } catch (error) {
            console.log(error)
        }
    }
   

    const formik = useFormik({
        initialValues: {
            email: "",
            name: "",
            phone: "",
            address:""

        },
        validate: (values) => {
            let error = {}
            if (!values.name) {
                error.name = "Please enter First Name";
            } else if (values.name.length <= 3) {
                error.fname = "Please enter First Name"
            }
            
            if (!values.email) {
                error.email = "Email is required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                error.email = "Enter a valid email"
            }

            if (!values.phone) {
                error.phone = "Please enter Phone Number";
            }
            if (!values.address) {
                error.address = "Please enter Address";
            }

            return error;
        },
        onSubmit: async (values) => {
            try {
                 setupdating(true)      
                 const orderData = {
                    ...values, // Contains name, email, phone, address
                    cartItems: cartItems.map((item, index) => ({
                      name: item.product.name,
                      price: item.product.price,
                      quantity: quantities[index], // Include the corresponding quantity
                      // Include other relevant details from cartItems if needed
                    })),
                    totalPrice: calculateTotalPrice(), // Total price calculation from the cart
                  };
              
                  const response = await axios.post(`http://localhost:8000/orderlist`, orderData, {
                    headers: {
                      Authorization: `${window.localStorage.getItem("token")}`
                    }
                  });
                  
                  
              console.log(response)
              if (response.status === 200) {
                await axios.delete(`http://localhost:8000/addtocart/${id}`,{
                  headers: {
                      Authorization: `${window.localStorage.getItem("token")}`
                  }
              });
            }
              
                  alert("Order placed successfully!");
                  navigate(`/orderlist`);
                  
                } catch (error) {
                console.log(error)
            }
            console.log(values)
        }

    })
  
    return (
      <>
       {isloading ? (<div class="col d-flex justify-content-center" >
                <h1 style={{ color: "tomato", maxwidth: "10rem", fontSize: "40px", fontFamily: "cursive" }}>Loading</h1>
            </div>
            ) : 
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ maxWidth: '800px', width: '100%', display: 'flex', gap: '20px', padding: '20px', border: '1px solid #ccc' }}>
          <div style={{ flex: '1'}}>
            <h2 style={{fontFamily:"cursive",color:"tomato" }}>Product Details</h2>
            {cartItems.map((item, index) => (
              <div key={index} >
                <h5 style={{fontFamily:"cursive",color:"black" }}>{item.product.name}</h5>
                <p style={{color:"black" }}>Price: {item.product.price}</p>
                <p style={{color:"black" }}>Quantity:{quantities[index]} </p>
                {/* Additional details about the items in the cart */}
              </div>
            ))}
            <h4 style={{fontFamily:"cursive",color:"black" }}> Total Price: {calculateTotalPrice()}</h4>
          </div>
          <div style={{ flex: '1' }}>
            <h2 style={{fontFamily:"cursive",color:"tomato" }}>Shipping Details</h2>
            <form onSubmit={formik.handleSubmit}>

<div className='row ml-1'>
    <div className='form-group col-lg-4'>
        <label>First Name</label>
        <input className={`form-control ${formik.errors.name ? "is-invalid" : "is-valid"} `}
            name='name'
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
        ></input>
        <span style={{ color: "red" }}>{formik.errors.name}</span>
    </div>
   
</div>
<div className='form-group col-lg-8'>
    <label>Email</label>
    <input className={`form-control ${formik.errors.email ? "is-invalid" : "is-valid"} `}

        name='email'
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        placeholder='Enter Email'></input>
    <span style={{ color: "red" }}>{formik.errors.email}</span>
</div>

<div className='form-group col-lg-8'>
    <label>Phone Number</label>
    <input className={`form-control ${formik.errors.phone ? "is-invalid" : "is-valid"} `}
        name='phone'
        onChange={formik.handleChange}
        type="number"
        value={formik.values.phone}
        placeholder='Enter phone Number'></input>
    <span style={{ color: "red" }}>{formik.errors.phone}</span>
</div>
<div className='form-group col-lg-8'>
              <label>Address</label>
              <textarea 
              className={`form-control ${formik.errors.phone ? "is-invalid" : "is-valid"} `}
              name="address" value={formik.values.address} onChange={formik.handleChange}
              placeholder='Enter phone Number' />
              <span style={{ color: "red" }}>{formik.errors.address}</span>
            </div>


            <input type={"submit"} disabled={isupdating} value={isupdating ? "Confirming..." : "Confirm"}
                                className='btn btn-primary' />
  

  <Link to="/cart">   <button 
        className='btn btn-primary' onClick={() => window.location.reload()}>Back to cart</button>
  </Link>


</form >

          </div>
        </div>
      </div>}
      </>
    );
  }
  
  export default CheckoutForm;
  