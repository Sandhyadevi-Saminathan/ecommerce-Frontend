import React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
    const data = localStorage.getItem('ID');
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validate: (values) => {
            let error = {}
            if (!values.email) {
                error.email = "Please enter Email";
            }
            if (!values.password) {
                error.password = "Please enter Password";
            }
            return error

        },
        onSubmit: async (values) => {
            try {
                let userData = await axios.post('https://ecommerce-backend-xu6o.onrender.com/users/login', values);
                console.log(userData.data.user._id)
                window.localStorage.setItem("token", userData.data.token);
                window.localStorage.setItem("id", userData.data.user._id);
                alert("Login Succes");
                const ids = userData.data.user._id;
                console.log(ids)
                navigate(`/`)
            } catch (error) {
                alert('invalid user/password')
                console.error(error);
            }


        }
    })

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div class="card mb-3" style={{maxWidth: "1000px",width:"800px", height:"450px"}}>
  <div class="row g-0">
    <div class="col-md-6">
      <img src="https://blog.hubspot.com/hubfs/ecommerce-10.jpg" class="img-fluid rounded-start" alt="..." style={{height:"450px",width:"800px"}}/>
    </div>
    <div class="col-md-6">
      <div class="card-body">
      <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Welcome!</h1>
                                        </div>
                                        <form onSubmit={formik.handleSubmit}>
                                            <div className='form-group col-lg-12'>
                                                <label>User Name</label>
                                                <input className={`form-control ${formik.errors.email ? "is-invalid" : ""} `}
                                                    name='email'
                                                    type="email"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.email}
                                                    placeholder='Enter your Email'></input>
                                                <span style={{ color: "red" }}>{formik.errors.email}</span>
                                            </div>
                                            <div className='form-group col-lg-12'>
                                                <label>Password</label>
                                                <input className={`form-control ${formik.errors.password ? "is-invalid" : ""} `}
                                                    name='password'
                                                    onChange={formik.handleChange}
                                                    type="password"
                                                    value={formik.values.password}
                                                    placeholder='Enter your password'></input>
                                                <span style={{ color: "red" }}>{formik.errors.password}</span>
                                            </div>
                                            <div className='form-group col-lg-12 text-center '>
                                                <button type='submit' className='btn btn-primary rounded col-sm-5 justify-content-center text-center'>Log in</button>
                                            </div>
                                            <div className='form-group col-lg-12 text-center'><p className='text-center'>Don't have account?</p>
                                                <Link to={'/users/register'}> <button type='button' className='btn btn-primary rounded col-sm-5 justify-content-center text-center'>Sign Up</button></Link>
                                            </div>
                                            <p className='forgot-password text-end mt-2'>
                                                <Link to={'/users/Forget'}>Forgot Password?</Link>
                                            </p>
                                        </form>
      </div>
    </div>
  </div>
</div>
</div>
        
    )
}

export default Login