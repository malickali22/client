import React , { useState,useEffect } from 'react'
import newRequest from '../utils/newRequest'
import { useFormik } from "formik";
import { signInSchema } from "../schemas/index";
import { NavLink, useNavigate } from 'react-router-dom';
import getCurrentUser from '../utils/getCurrentUser';
import Lottie from 'lottie-react';
import animationData from '../assets/animation_ll3j6b3u.json';

export default function Signin() {

  const currentuser = getCurrentUser();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);  

  const initialValues = {
    email: "",
    password: ""
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { email, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      localStorage.setItem("token", res.data.token);
  
     
      const redirectPath = localStorage.getItem("redirectPath");
      if (redirectPath) {
        localStorage.removeItem("redirectPath"); 
        navigate(redirectPath);
      } else {
        navigate("/"); 
      }
    } catch (err) {
      setError(err.response.data);
    }
  };
  

  const { values, handleBlur, handleChange, errors, touched } =
  useFormik({
    initialValues,
    validationSchema: signInSchema,
    validateOnChange: true,
    validateOnBlur: false,
    // onSubmit: (values, action) => {
    //   console.log("🚀 ~ file: App.jsx ~ line 17 ~ App ~ values", values);
    //   action.resetForm();
    // },
  });





console.log(errors);
  return (
    <div>
       {currentuser ? (
        <div className='button' style={{ display: "flex", justifyContent: "center", alignItems: "center", margin:"50% auto" }}>
           <NavLink to="/" className="Home_button" style={{ textDecoration: 'none', color: 'inherit' }}>
           <button
             style={{
               backgroundColor: '#a891b7',
               color: 'white',
               border: 'none',
               padding: '0.2rem 1rem',
               borderRadius: '5px',
               cursor: 'pointer',
               transition: 'all 0.3s',
             }}
             
             onMouseEnter={(e) => {
               e.target.style.backgroundColor = '#a891b7';
               e.target.style.color = 'black';
               e.target.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
               e.target.style.transform = 'scale(1.05)';
             }}
             onMouseLeave={(e) => {
               e.target.style.backgroundColor = '#a891b7';
               e.target.style.color = 'white';
               e.target.style.boxShadow = 'none';
               e.target.style.transform = 'scale(1)';
             }}
           >
             Go to Home
           </button> 
           </NavLink>
           </div>
          ) : (
   <header >
      <div className="container py-4 ">
  
    <div className="row d-flex align-items-center justify-content-center vh-100">
      <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6">
      
      <Lottie animationData={animationData}></Lottie>
      </div>
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
      <h1 className="text-center mb-5 mt-4" style={{fontWeight: "800", color: "#333", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", letterSpacing: "1px"}}>
        LOGIN
      </h1>

        <form onSubmit={handleSubmit}>  
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
                      onChange={(e) => {
                        handleChange && handleChange(e);
                        setEmail(e.target.value);
                      }}
                      
                      onBlur={handleBlur}
                     
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
                      autoComplete="off"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={(e) => {
                        handleChange && handleChange(e);
                        setPassword(e.target.value);
                      }}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password ? (
                      <p className="form-error" style={{color:"red"}}>{errors.password}</p>
                    ) : null}
                 </div>
  

          <div className="d-flex justify-content-between align-items-center mb-4">
            
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
              <label className="form-check-label" > Remember me </label>
            </div>
            <NavLink  to="/ForgetPass"  style={{ textDecoration: 'none' }}>Forgot password?</NavLink>
          </div>

         <div>
          <button type="submit" className="btn btn-primary btn-md btn-block mb-3">Sign in</button></div>
          <label className='erros' style={{color:"red"}}>{error && error}</label> 
         
            <div className='singupbtn pr-5 mb-5'><NavLink  to="/Signup"  style={{ textDecoration: 'none' }}>New User? Sign Up</NavLink> </div>
         
          </form>
      </div>
    </div>
  </div>           
</header>

)}
    </div>
    
  )
}