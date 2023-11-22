import React, { useContext } from 'react'
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

function Verification() {
    const [isloading, setloading] = useState(false)
    let navigate = useNavigate();
    let params = useParams()
    let formik = useFormik({
        initialValues: {
            vercode: '',
        },
        validate: (values) => {
            let errors = {};
            if (!values.vercode) {
                errors.vercode = "Please enter the validation code";
            }
            return errors;
        },
        onSubmit: async (values) => {
            setloading(true)
            try {
                const res = await axios.post(`https://ecommerce-backend-xu6o.onrender.com/users/verification/${params.id}`, values);


                if (res.data) {
                    alert("Verified");
                    navigate(`/Changepassword/${params.id}`);
                }
                else {
                    alert(res.data.message);
                }
            } catch (error) {
                console.log(error);
                alert(`${error.response.data.message}`);
            }
        }
    })
    return (
        <div className="container" >
            <div className="row justify-content-center" >
                <div className=" col-lg-5 " >
                    <div className="card o-hidden border-0 shadow-lg my-5 p-3 border bg-info" style={{height:"200px"}}>
                        <h5 className="text-justify mb-3" style={{ fontSize: "20px", fontFamily: "cursive" }}>Enter your Verification Code</h5>
                        <br/>
                        <div className="col">
                            {/* <h6 className='pb-3 pt-3'>Mailid: {mail}</h6> */}
                            <form onSubmit={formik.handleSubmit}>
                                <div className="col-lg-10 d-flex justify-content-between">
                                    <div className="row">
                                        <div className="form-group col-lg-10">
                                            <input
                                                type={"text"}
                                                className="form-control form-control-user mb-2"
                                                name={'vercode'}
                                                value={formik.values.vercode}
                                                onChange={formik.handleChange}
                                                placeholder="- - - -"
                                            />
                                            {
                                                formik.errors.vercode ? <span style={{ color: 'red' }}> {formik.errors.vercode}</span> : null
                                            }
                                        </div>
                                     
                                        <div className='col-lg-2'>
                                            <button type='submit' disabled={isloading} className='btn btn-success' style={{ fontSize: "16px", fontFamily: "cursive" }}>Verify</button>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Verification