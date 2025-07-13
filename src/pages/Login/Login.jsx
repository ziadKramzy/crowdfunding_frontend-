import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axiosInstance from "../../apis/config";

const Login = () => {
  let navigate = useNavigate();
  let [loginerror, setLoginerror] = useState(null);
  const [isloading, setIsloading] = useState(null);

  let handleLogin = (values) => {
    setIsloading(true);
    axiosInstance
      .post("login", values)
      .then((response) => {
        console.log(response);
        if (response.data.message === "Login successful") {
          localStorage.setItem("userToken", response?.data?.tokens?.access);
          localStorage.setItem("refresh_token", response?.data?.tokens?.refresh);
          localStorage.setItem("userId", response?.data?.user?.id);
          setIsloading(false);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        setIsloading(false);
        setLoginerror(error.message);
      });
  };
  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Please enter your email"),
    password: Yup.string()
      .matches(
        /^[A-Z][A-Za-z0-9@#$%^&*]{5,10}$/,
        "Password must start with a capital letter, be 6–11 characters long, and can include @#$%^&*"
      )
      .required("Password is required"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleLogin,
  });
  useEffect(() => {}, []);
  return (
    <>
      {loginerror ? (
        <div className="alert alert-danger" role="alert">
          {loginerror}
        </div>
      ) : null}
      <div className="container d-flex justify-content-center mt-3 pt-5">
        <div
          className="py-5 px-4 my-5   border-dark rounded-3 shadow-lg"
          style={{ maxWidth: "700px", width: "100%" }}
        >
          <h2 className="text-primary  text-center">Login Now</h2>

          <form className="w-100 px-5 py-5" onSubmit={formik.handleSubmit}>
            <div className="form-floating mb-3 ">
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
            {formik.errors.email && formik.touched.email ? (
              <div className="alert alert-danger" role="alert">
                {formik.errors.email}
              </div>
            ) : null}
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
            {formik.errors.password && formik.touched.password ? (
              <div className="alert alert-danger" role="alert">
                {formik.errors.password}
              </div>
            ) : null}

            <div>
              <button type="submit" className="btn btn-primary btn-lg text-white ">
                {isloading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Login"
                )}{" "}
              </button>
            </div>
            <p className="mt-4 text-center me-1">
              You don't have account?{" "}
              <Link
                className="nav-link d-inline fw-bold text-info"
                to="/register"
              >
                <span className="text-primary"> Register</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
