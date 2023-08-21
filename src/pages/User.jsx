import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import newRequest from '../utils/newRequest';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import getCurrentUser from '../utils/getCurrentUser';
import Lottie from 'lottie-react';
import animationData from '../assets/animation_ll3jqfy3.json';

const User = () => {

  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [updated, setUpdated] = useState('');
  const [deleted, setDelete] = useState('');
  const currentUser = getCurrentUser();
   const id = currentUser._id;
   const navigate = useNavigate();
  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().matches(/^(0)3\d{9}$/, "Phone number is not valid*"),
  });
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        
        const response = await newRequest.get(`/user/${id}`);
        const user = response.data;
        setUserData(user);
      } catch (error) {
        console.error('Error fetching User data:', error);
      }
    };
    fetchUserData();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      const userId = userData._id
      const response = await newRequest.put(`/user/update/${userId}`, values);
      if (response.data.message) {
        setMessage(response.data.message); // Set the message from the response
      }
      if (response.data.updatedUser) {
        setUpdated("Your Profile is Updated*"); // Set the message from the response
      }
      const message = "*Your Profile is updated*";
       window.confirm(message);
       
    } catch (err) {
        setError(err.response.data);
      console.error('Error updating profile:', error);
    }
  };

  const handleDeleteAccount= async () => {
    try {
      let isConfirmed = false;
      const message = "* Do you want to Delete your Account? *";
      const confirm = window.confirm(message);
      if(confirm){
      const id = userData._id
      const res = await newRequest.delete(`/user/${id}`);
      if (res.data.deleted) {
        setDelete("Your Account is Deleted"); // Set the message from the response
      }
      try {
        await newRequest.post("/auth/logout");
        localStorage.setItem("currentUser", null);
      } catch (err) {
        console.log(err);
      }
      isConfirmed = true;
    }
    if(isConfirmed){
      const message1 = "* Account Deleted, Thank You* *";
      window.confirm(message1);
      navigate("/");
    }
    } catch (err) {
      setError(err.response.data);
    console.error('Error updating profile:', error);
  }
};

  return (
    <div>
      <header>
        <div className="container py-4 h-100">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6">
            <Lottie animationData={animationData}></Lottie>
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <h1 className="text-center mb-5 mt-3" style={{ fontWeight: '800', color: '#333', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", letterSpacing: '1.3px' }}>
               My Profile
              </h1>
              {userData && (
                <Formik initialValues={{ ...initialValues, ...userData }} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  <Form>
                    <div className="form-outline mb-2">
                      <label htmlFor="firstname" className="form-label">
                        First Name
                      </label>
                      <Field type="text" className="form-control" name="firstname" id="firstname" placeholder="First Name" />
                      <ErrorMessage name="firstname" component="div" className="form-error" style={{ color: 'red' }}/>
                    </div>

                    <div className="form-outline mb-2">
                      <label htmlFor="lastname" className="form-label">
                        Last Name
                      </label>
                      <Field type="text" className="form-control" name="lastname" id="lastname" placeholder="Last Name" />
                      <ErrorMessage name="lastname" component="div" className="form-error" style={{ color: 'red' }}/>
                    </div>

                    <div className="form-outline mb-2">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <Field type="email" className="form-control" name="email" id="email" placeholder="Email" />
                      <ErrorMessage name="email" component="div" className="form-error" style={{ color: 'red' }} />
                      {message && (
                       <p className='message' style={{color: "green", fontWeight:"600"}}>{message}</p>
                        )}
                    </div>

                    <div className="form-outline mb-2">
                      <label htmlFor="phone" className="form-label">
                        Phone Number
                      </label>
                      <Field type="text" className="form-control" name="phone" id="phone" placeholder="Phone number" />
                      <ErrorMessage name="phone" component="div" className="form-error" style={{ color: 'red' }}/>
                    </div>

                    <button type="submit" className="input-button btn btn-primary btn-md btn-block mb-3">
                      Update My Data
                    </button>

                    <div className="signinbtn pr-5 mb-5">
                      <NavLink to="/changepass"  style={{ textDecoration: 'none' }}>
                        Change Password? Click here
                      </NavLink>
                    </div>
                    {updated && (
                       <p className='message' style={{color: "green", fontWeight:"800"}}>{updated}</p>
                        )}
                    <label className='erros' style={{color:"red"}}>{error && error}</label> 

                    <button type="button" className="input-button btn btn-danger btn-md btn-block mb-3" onClick={handleDeleteAccount}>
                      Delete My Account
                    </button>
                    {deleted && (
                       <p className='message' style={{color: "green", fontWeight:"600"}}>{deleted}</p>
                        )}
                  </Form>
                </Formik>
              )}
               
              
            </div>
          </div>
        </div>
      </header>
      <footer className="footer_date" style={{ borderTop: 'solid 1px #ccc', paddingBottom: '1rem' }}>
        <p style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '1rem' }}>&copy; {new Date().getFullYear()} Shampy. All rights reserved</p>
      </footer>
    </div>
  );
};

export default User;
