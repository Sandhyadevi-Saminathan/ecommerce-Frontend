import React, { useState } from 'react'
import { Field, useFormik, Formik } from 'formik'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';



function Register() {


    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            name: "",
            password: "",
            phone: "",
        },
        validate: (values) => {
            let error = {}
            if (!values.name) {
                error.name = "Please enter your Name";
            } else if (values.name.length <= 3) {
                error.fname = "Please enter valid Name"
            }
            if (!values.email) {
                error.email = "Please enter your Email";
            }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                error.email = "Email a valid Email"
            }
            if (!values.password) {
                error.password = "Please enter Password";
            } else if (values.password.length < 8) {
                error.password = 'Length should be more than 8 Characters';
            }
            if (!values.phone) {
                error.phone = "Please enter Phone Number";
            }
          
            return error

        },
        onSubmit: async (values) => {
            try {

                let userData = await axios.post("http://localhost:8000/register", values);
                window.localStorage.setItem("my_token", userData.data.token);
                alert("Registered Successfully");
                formik.resetForm();
                navigate("/");
            } catch (error) {

                console.log(error);
            }

        }

    })

  

    return (
        <>

            <div className='container'>
                <div className='row justify-content-center align-items-center'>

                    <div className="col-md-9 col-lg-6 col-xl-4 h-70 shadow p-3 mb-5 mt-5 rounded" style={{ backgroundColor:"pink" }}>
                        <h3 className='text-center ' style={{ fontSize: "23px", fontFamily: "cursive",color:"royalblue" }}>Registration Form </h3>
                        <form onSubmit={formik.handleSubmit}>
                           
                                <div className='form-group col-lg-12'>
                                    <label style={{ fontSize: "18px", fontFamily: "cursive",color:"tomato" }}>Name</label>
                                    <input
                                        name='name'
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        type={"text"}
                                        placeholder='Enter your Name'
                                        className={`form-control ${formik.errors.name ? "is-invalid" : "is-valid"} `}
                                    ></input>
                                    <span style={{ color: "red" }}>{formik.errors.name}</span>
                                </div>
                                     
                            <div className='form-group col-lg-12'>
                                <label style={{ fontSize: "18px", fontFamily: "cursive",color:"tomato" }}>Email</label>
                                <input className={`form-control ${formik.errors.email ? "is-invalid" : "is-valid"} `}

                                    name='email'
                                    type="email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    placeholder='Enter your Email'></input>
                                <span style={{ color: "red" }}>{formik.errors.email}</span>
                            </div>
                            <div className='form-group col-lg-12'>
                                <label style={{ fontSize: "18px", fontFamily: "cursive",color:"tomato" }}>Phone Number</label>
                                <input className={`form-control ${formik.errors.phone ? "is-invalid" : "is-valid"} `}
                                    name='phone'
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.phone}
                                    placeholder='Enter your phone Number'></input>
                                <span style={{ color: "red" }}>{formik.errors.phone}</span>
                            </div>
                            <div className='form-group col-lg-12'>
                                <label style={{ fontSize: "18px", fontFamily: "cursive",color:"tomato" }}>Password</label>
                                <input className={`form-control ${formik.errors.password ? "is-invalid" : "is-valid"} `}
                                    name='password'
                                    onChange={formik.handleChange}
                                    type="password"
                                    value={formik.values.password}
                                    placeholder='Enter your password'></input>
                                <span style={{ color: "red" }}>{formik.errors.password}</span>
                            </div>
                       
                            <div className='form-group col-lg-12 text-center' >
                                <button type='submit' className='btn btn-primary rounded col-lg-5 mt-2'>Submit</button> <br/>

                                <NavLink to={'/'}> <button type='button' className='btn btn-primary rounded col-lg-5 mt-2'>Login</button></NavLink>

                            </div>
                        </form>
                    </div>
                </div >
            </div>

        </>
    )
}

export default Register