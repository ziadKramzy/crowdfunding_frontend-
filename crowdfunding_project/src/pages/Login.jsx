import axios from 'axios'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const Login = () => {
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [userToken, setUserToken] = useState(null) 

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      setUserToken(token)
    }
  }, [])

  const handleLogin = (values) => {
    setIsLoading(true)
    setLoginError(null)

    axios
      .post('http://127.0.0.1:8000/api/login', values)
      .then((response) => {
        console.log(response)

        if (response.data.message === 'Login successful') {
          localStorage.setItem('access_token', response.data.access)
          localStorage.setItem('refresh_token', response.data.refresh)

          setUserToken(response.data.access)

          setIsLoading(false)
          navigate('/')
        }
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
        setLoginError(error.response?.data?.detail || error.message)
      })
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Please enter your email'),
    password: Yup.string()
      .matches(
        /^[A-Z][A-Za-z0-9@#$%^&*]{5,10}$/,
        'Password must start with a capital letter, be 6–11 characters long, and can include @#$%^&*'
      )
      .required('Password is required'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleLogin,
  })

  return (
    <>
      {loginError && (
        <div className="alert alert-danger" role="alert">
          {loginError}
        </div>
      )}

      <div className="container d-flex justify-content-center mt-3 pt-5">
        <div
          className="py-5 px-4 my-5 border-dark rounded-3 shadow-lg"
          style={{ maxWidth: '700px', width: '100%' }}
        >
          <h2 className="text-info text-center">Login Now</h2>

          <form className="w-100 px-5 py-5" onSubmit={formik.handleSubmit}>
            <div className="form-floating mb-3">
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="email"
                className="form-control px-5"
                id="floatingInput"
                name="email"
                placeholder="name@example.com"
                required
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            {formik.errors.email && formik.touched.email && (
              <div className="alert alert-danger" role="alert">
                {formik.errors.email}
              </div>
            )}

            <div className="form-floating mb-4">
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                className="form-control"
                id="floatingPassword"
                name="password"
                placeholder="Password"
                required
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            {formik.errors.password && formik.touched.password && (
              <div className="alert alert-danger" role="alert">
                {formik.errors.password}
              </div>
            )}

            <div>
              <button type="submit" className="btn btn-info btn-lg text-white">
                {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Login'}
              </button>
            </div>

            <p className="mt-4 text-center me-1">
              You don't have an account?{' '}
              <Link className="nav-link d-inline fw-bold text-info" to="/register">
                <span>Register</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
