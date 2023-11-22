import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/Checkout.css';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

function Checkout() {
    const id = window.localStorage.getItem('id');
    const [isupdating, setupdating] = useState(false);
    const [isloading, setloading] = useState(true)
    const navigate = useNavigate();
  

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchUserDetails();
    fetchCartItems();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`https://ecommerce-backend-xu6o.onrender.com/user/${id}`, {
        headers: {
            Authorization: `${window.localStorage.getItem("token")}`
        }
    })
    
     
      formik.setValues(response.data)
      setloading(false)
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`https://ecommerce-backend-xu6o.onrender.com/cart/addtocart/${id}`,{
        headers: {
            Authorization: `${window.localStorage.getItem("token")}`
        }
    })
      setCartItems(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
        email: "",
        name: "",
        phone: "",

    },
    validate: (values) => {
        let error = {}
        if (!values.name) {
            error.name = "Please enter Name";
        } else if (values.name.length <= 3) {
            error.name = "Please enter Name"
        }
        if (!values.email) {
            error.email = "Email is required"
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            error.email = "Enter a valid email"
        }

        if (!values.phone) {
            error.phone = "Please enter Phone Number";
        }

        return error;
    },
    onSubmit: async (values) => {
        try {

            setupdating(true)
            const user = await axios.post(`https://ecommerce-backend-xu6o.onrender.com/orders`, values, {
                headers: {
                    Authorization: `${window.localStorage.getItem("token")}`
                }
            })
            alert("update done")
            console.log(user)
            navigate(`/`)
        } catch (error) {
            console.log(error)
        }
        console.log(values)
    }

})
  return (
    <>
    {isloading ? (
        <div class="col d-flex justify-content-center">
            <h1>Loading</h1>
        </div>

    )
        :
        <div style={{ display: "flex", justifyContent: "center", marginTop:"4px"}}>
            <div class="card mb-3" style={{maxWidth: "1000px",width: "100%"}}>
            <div class="row g-4">
            <div class="col-md-6">
           
            {cartItems.map((item, index) => (
            <div key={index} >               
                  <h5 className="card-title">{item.product.name}</h5>
                  <p className="card-text" style={{ color: "black" }}>Price: {item.product.price}</p>
                
            </div>
          ))}
       
    </div>
    <div class="col-md-6">
      <div class="card-body">
      <div className="text-center">
            <form onSubmit={formik.handleSubmit}>

                <div className='row ml-1'>
                    <div className='form-group col-lg-8'>
                        <label> Name</label>
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
                        placeholder='Enter Employee Email'></input>
                    <span style={{ color: "red" }}>{formik.errors.email}</span>
                </div>

                <div className='form-group col-lg-8'>
                    <label>Phone Number</label>
                    <input className={`form-control ${formik.errors.phone ? "is-invalid" : "is-valid"} `}
                        name='phone'
                        onChange={formik.handleChange}
                        type="number"
                        value={formik.values.phone}
                        placeholder='Enter Employee phone Number'></input>
                    <span style={{ color: "red" }}>{formik.errors.phone}</span>
                </div>


                <div className='col-lg-3 mt-4 '>
                  
                    <Link to={`/`} className='btn btn-primary ml-2 '>Back</Link>
                </div>



            </form >
        </div >
        </div>
        </div>
        </div>
        </div>
        </div>
    }
</>
  );
}

export default Checkout;
