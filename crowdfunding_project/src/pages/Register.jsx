import React, {  useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {useFormik} from 'formik'
import axios from 'axios'
import * as Yup from 'yup'

const Register =()=> {
  let navigate = useNavigate()

  let validationShema = Yup.object({
    first_name: Yup.string().min(3,'min length 3').max(10,'max length 10').required('Please enter your frist name'),
    last_name: Yup.string().min(3,'min length 3').max(10,'max length 10').required('Please enter your last name'),
    email: Yup.string().email('Invalid email').required('Please enter your email'),
    phone_number:Yup.string().matches(/^01[0125][0-9]{8}$/ , 'phone number must be egyptian number'),
    password:Yup.string()
      .matches(/^[A-Z][A-Za-z0-9@#$%^&*]{5,10}$/, 'Password must start with a capital letter, be 6–11 characters long, and can include @#$%^&*')
      .required('Password is required'),
    confirm_password:Yup.string().oneOf([Yup.ref('password')] , 'not match password')
  })

  const [apiError , setApiError] = useState(null)
  const [isloading , setIsloading] = useState(false)

  function handelRegister(formValues){
    setIsloading(true)
    console.log(formValues);
    axios.post('http://127.0.0.1:8000/api/register' ,formValues)
      .then((res)=>{
        console.log(res);
        if (res?.data?.message === 'User Registered') {
          localStorage.setItem('userToken' , res?.data?.tokens?.access)
          setIsloading(false)
          navigate('/login');
        }
      })
      .catch((res)=>{
        setIsloading(false)
        setApiError(res.data.message)
      })
  }

  let formik = useFormik({
    initialValues:{
      first_name:"",
      last_name:"",
      email:"",
      password:"",
      confirm_password:"",
      phone_number:''
    },
    validationSchema:validationShema,
    onSubmit: handelRegister
  })

  useEffect(()=>{},[])

  return (
    <>
      {apiError?<div className="alert alert-danger" role="alert">{apiError}</div>:null}

      <div className="container d-flex justify-content-center align-items-center mt-2 pt-5" style={{ minHeight: '100vh', paddingTop: '120px' ,zIndex: 1}}>
        <div className="w-100" style={{ maxWidth: '700px' }}>
          <div className="card shadow-lg ">
            <div className="card-body p-5">
              <h2 className="text-info text-center mb-4">Register Now</h2>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-floating mb-3">
                  <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.first_name} type="text" name='first_name' className="form-control" id="floatingName" placeholder="ex.shimaa" />
                  <label htmlFor="floatingName">Frist Name</label>
                </div>
                {formik.errors.first_name && formik.touched.first_name && <div className="alert alert-danger">{formik.errors.first_name}</div>}

                <div className="form-floating mb-3">
                  <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.last_name} type="text" name='last_name' className="form-control" id="floatingLastName" placeholder="ex.nasser" />
                  <label htmlFor="floatingLastName">Last Name</label>
                </div>
                {formik.errors.last_name && formik.touched.last_name && <div className="alert alert-danger">{formik.errors.last_name}</div>}

                <div className="form-floating mb-3">
                  <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} name='email' type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                {formik.errors.email && formik.touched.email && <div className="alert alert-danger">{formik.errors.email}</div>}

                <div className="form-floating mb-4">
                  <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} name='password' type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                {formik.errors.password && formik.touched.password && <div className="alert alert-danger">{formik.errors.password}</div>}

                <div className="form-floating mb-4">
                  <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirm_password} name='confirm_password' type="password" className="form-control" id="floatingrePassword" placeholder="confirm_password" />
                  <label htmlFor="floatingrePassword">Confirm Password</label>
                </div>
                {formik.errors.confirm_password && formik.touched.confirm_password && <div className="alert alert-danger">{formik.errors.confirm_password}</div>}

                <div className="form-floating mb-4">
                  <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone_number} name='phone_number' type="tel" className="form-control" id="floatingPhone" placeholder="ex.01091230471" />
                  <label htmlFor="floatingPhone">Phone Number</label>
                </div>
                {formik.errors.phone_number && formik.touched.phone_number && <div className="alert alert-danger">{formik.errors.phone_number}</div>}

                <div>
                  <button type="submit" className="btn btn-info btn-lg w-100 text-white">
                    {isloading ? <i className='fas fa-spinner fa-spin'></i> : 'Register'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
