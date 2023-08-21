import { useEffect, useState, Fragment } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { newPasswordSchema } from "./../../schemas/index";
import styles from "../PasswordReset/style.module.css";
import Lottie from 'lottie-react';
import animationData from '../../assets/animation_ll3jzn1r.json';

const PasswordReset = () => {
	const [validUrl, setValidUrl] = useState(false);

	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
	const param = useParams();
	const url = `http://localhost:8800/api/auth/${param.id}/${param.token}`;

    const initialValues = {
    newPassword: '',
    confirmPassword: '',
    };

  


	useEffect(() => {
		const verifyUrl = async () => {
			try {
				await axios.get(url);
				setValidUrl(true);
			} catch (error) {
				setValidUrl(false);
			}
		};
		verifyUrl();
	}, [param, url]);

	const handleSubmit = async (e) => {
        const password = e.newPassword
        console.log(password)
		try {
			const { data } = await axios.post(url, { password });
			setMsg(data.message);
			setError("");
			window.location = "/signin";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("");
			}
		}
	};

	return (
        <Fragment>
			{validUrl ? ( <>
      <header>
        <div className="container py-4 h-100">
          <div className="row d-flex align-items-center justify-content-center">
          <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6">
              <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6">
              <Lottie animationData={animationData}></Lottie>
              </div>
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 pt-5 pb-5">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h1 className="text-center mb-5 mt-3" style={{ fontWeight: '800', color: '#333', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", letterSpacing: '1.3px' }}>
                    CHANGE PASSWORD
                  </h1>
                  
                  <Formik initialValues={initialValues } validationSchema={newPasswordSchema} onSubmit={handleSubmit}>
                    <Form>
                      <div className="form-outline mb-2">
                        <label htmlFor="newPassword" className="form-label">
                          New Password
                        </label>
                        <Field type="password" className="form-control" name="newPassword" id="newPassword" placeholder="New Password" />
                        <ErrorMessage name="newPassword" component="div" className="form-error" style={{ color: 'red' }}/>
                      </div>

                      <div className="form-outline mb-2">
                        <label htmlFor="confirmPassword" className="form-label">
                          Confirm Password
                        </label>
                        <Field type="password" className="form-control" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" />
                        <ErrorMessage name="confirmPassword" component="div" className="form-error" style={{ color: 'red' }} />
                      </div>

                      <button type="submit" className="input-button btn btn-primary btn-md btn-block mb-3">
                        Change Password
                      </button>

                      <div className="signinbtn pr-5 mb-5">
                        <NavLink to="/Signin"  style={{ textDecoration: 'none' }}>
                          Back to Login
                        </NavLink>
                      </div>
                    </Form>
                  </Formik>

                  {error && <div className={styles.error_msg}>{error}</div>}
					{msg && <div className={styles.success_msg}>{msg}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      </> ) : ( <>
				<h1>404 Not Found</h1>
                </>)}
    </Fragment>
		
	);
};

export default PasswordReset;