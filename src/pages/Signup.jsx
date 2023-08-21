import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import newRequest from '../utils/newRequest';
import { useFormik } from "formik";
import { signUpSchema } from "../schemas/index.jsx";
import Lottie from 'lottie-react';
import animationData from '../assets/animation_ll3i1pr7.json';

export default function Signup(){


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);  

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  };

  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    isSeller: true,
  });
  const navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      validateOnChange: true,
      validateOnBlur: false,

    });

    const handleChangeValue = (e) => {
      setUser((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    };

  console.log(errors);

  const handleSubmitValue = async (e) => {
    e.preventDefault();

    try {
      await newRequest.post("/auth/register", {
        ...user
      });

      const message = "Verification Email is sent on your email, Please Verify!";
      const isConfirmed = window.confirm(message);
  
      if (isConfirmed) {
        navigate("/signin");
      }
    } catch (err) {
      setError(err.response.data);
    }
  };


  
  return (
    
    <div>
      <header >
        <div className="container py-4 h-100">

    <div className="row d-flex align-items-center justify-content-center ">
    <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6">
      <Lottie animationData={animationData}></Lottie>
  
    </div>
   
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
      <h1 className="text-center mb-5 mt-3" style={{fontWeight: "800", color: "#333", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", letterSpacing: "1.3px"}}>
        SIGN UP
      </h1>
      <form onSubmit={(e) => {handleSubmit() && handleSubmit(e) ; handleChangeValue && handleSubmitValue(e)}}>
      <div className="form-outline mb-2">
                    <label htmlFor="firstname" className="form-label">
                     Username 
                    </label >
                    <input
                    className='form-control'
                      type="text"
                      autoComplete="nope"
                      name="username"
                      id="username"
                      placeholder="Username must be unique"
                      value={values.username}
                      onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e)}}
                      onBlur={handleBlur}
                      required
                    />
                    {touched.username && errors.username ? ( 
                      <p className="form-error" style={{color:"red"}}>{errors.username}</p>
                    ) : null}
                </div>
                <div className="form-outline mb-2">
                    <label htmlFor="firstname" className="form-label">
                     First Name
                    </label >
                    <input
                    className='form-control'
                      type="text"
                      autoComplete="nope"
                      name="firstname"
                      id="firstname"
                      placeholder="Your First Name"
                      value={values.firstname}
                      onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e)}}
                      onBlur={handleBlur}
                      required
                    />
                    {touched.firstname && errors.firstname ? ( 
                      <p className="form-error" style={{color:"red"}}>{errors.firstname}</p>
                    ) : null}
                </div>
              
                <div className="form-outline mb-2">
                    <label htmlFor="lastname" className="form-label">
                     Last Name
                    </label >
                    <input
                    className='form-control'
                      type="text"
                      autoComplete="nope"
                      name="lastname"
                      id="lastname"
                      placeholder="Your Last Name"
                      value={values.lastname}
                      onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e)}}
                      onBlur={handleBlur}
                      required
                    />
                    {touched.lastname && errors.lastname ? ( 
                      <p className="form-error" style={{color:"red"}}>{errors.lastname}</p>
                    ) : null}
                </div>

                <div className="form-outline mb-2">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                    className='form-control'
                      type="email"
                      autoComplete="off"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e)}}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.email && touched.email ? (
                      <p className="form-error" style={{color:"red"}}>{errors.email}</p>
                    ) : null}

                  </div>

                  <div className="form-outline mb-2"> 
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                    className='form-control'
                      type="password"
                      autoComplete="false"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e)}}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.password && touched.password ? (
                      <p className="form-error" style={{color:"red"}}>{errors.password}</p>
                    ) : null}
                 </div>
                 
                 <div className="form-outline mb-3"> 
                    <label htmlFor="confirm_password" className="form-label">
                     Confirm Password
                    </label>
                    <input
                    className='form-control'
                      type="password"
                      autoComplete="nope"
                      name="confirm_password"
                      id="confirm_password"
                      placeholder="Confirm Password"
                      value={values.confirm_password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.confirm_password && touched.confirm_password ? (
                      <p className="form-error" style={{color:"red"}}>{errors.confirm_password}</p>
                    ) : null}
                  </div>


                  <div>
                  <button type="submit" className="input-button btn btn-primary btn-md btn-block mb-3">Sign up</button>
                  </div>
                 <label className='erros' style={{color:"red"}}>{error && error}</label> 

                  <div className='signinbtn pr-5 mb-5'><NavLink  to="/Signin"  style={{ textDecoration: 'none' }}> Already registered? Login</NavLink> </div>
                    </form>
      </div>
    </div>
  </div>
</header>
 <footer className='footer_date' style={{borderTop: 'solid 1px #ccc', paddingBottom:'1rem'}} > <p  style={{ textAlign:'center', marginTop: '2rem', marginBottom:'1rem'}}>&copy; {new Date().getFullYear()} Shampy. All rights reserved</p> </footer> 
    </div>
  )
}