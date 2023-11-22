import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'


function Changepassword() {
    let navigate = useNavigate();
    let params = useParams()


    const formik = useFormik(
        {
            initialValues: {
                password1: '',
                password2: '',
            },
            validate: (values) => {
                let errors = {};


                if (!values.password1) {
                    errors.password1 = 'Please enter the password'
                } else if (values.password1.length < 8) {
                    errors.password1 = 'Length should be more than 8 Characters';
                }
                if (!values.password2) {
                    errors.password2 = 'Please enter the password'
                } else if (values.password1 !== values.password2) {
                    errors.password2 = 'Password does not match'
                }
                return errors
            },
            onSubmit: async (values) => {
                try {
                    const user = await axios.post(`https://ecommerce-backend-xu6o.onrender.com/users/ChangePassword/${params.id}`, values);
                    console.log(user)
                    alert(user.data.message);
                    navigate('/login')
                } catch (error) {
                    console.log(error);
                }
            }
        }
    )
    return (
        <div className='row justify-content-center align-items-center'  >
            <div className="col-md-9 col-lg-6 col-xl-4 h-70 shadow p-3 mb-5 mt-5 rounded" style={{ backgroundColor: "white" }}>

                <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Reset Your Password </h1>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className='row'>
                        <div className="col-lg-12 mt-2">
                            <div className="form-group">
                                <input
                                    type={"text"}
                                    className="form-control form-control-user"
                                    name={'password1'}
                                    onChange={formik.handleChange}
                                    value={formik.values.password1}
                                    placeholder="Enter Password"
                                />
                                {
                                    formik.errors.password1 ? <span style={{ color: 'red' }}> {formik.errors.password1}</span> : null
                                }
                            </div>
                        </div>
                        <div className="col-lg-12 mt-2">
                            <div className="form-group">
                                <input
                                    type={"text"}
                                    className="form-control form-control-user"
                                    name={'password2'}
                                    onChange={formik.handleChange}
                                    value={formik.values.password2}
                                    placeholder="Confirm Password"
                                />
                                {
                                    formik.errors.password2 ? <span style={{ color: 'red' }}> {formik.errors.password2}</span> : null
                                }
                            </div>
                        </div>

                        <div className='col-lg-6 mt-2'>
                            <button

                                type={"submit"}
                                className="btn btn-primary btn-user btn-block m-2"

                            >
                                Reset Password
                            </button>
                        </div>


                    </div>
                </form>


            </div >
        </div >

    )
}

export default Changepassword