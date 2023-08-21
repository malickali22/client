import {React, useState} from 'react'
import newRequest from '../../utils/newRequest';

export default function ForgetPas() {

	const [responseMessage, setResponseMessage] = useState('');
const [email, setEmail] = useState("");
const [error, setError] = useState(null);
const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

const handleSubmit = async (e) =>{
	e.preventDefault();
	setSubmitButtonDisabled(true);
	try {
		const response = await newRequest.post("/auth/forgetPass", {email} );
		setSubmitButtonDisabled(true);
		if(response.data){
			setResponseMessage(response.data);
		}

	  } catch (err) {
		setError(err.response.data);
		setSubmitButtonDisabled(false);
	  }

};




  return (
    <div>
        
		<div className="container p-5">
			<div className=" justify-content-center col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 text-center">
				
				<form className="rounded bg-white shadow p-5" onSubmit={handleSubmit}>
					<h3 className="text-dark fw-bolder fs-4 mb-2">Forget Password </h3>

					<div className="fw-normal text-muted mb-4">
						Enter your email to reset your password.
					</div>  

					<div className="form-floating mb-3">
						<input type="email" name='email'  className="form-control" id="floatingInput" placeholder="name@example.com" required
						 onChange={(e) => {
							setEmail(e.target.value);
						  }}
						  disabled={submitButtonDisabled}
						/>
						<label >Email address</label>
					</div>  

					<button type="submit"  className="btn btn-primary submit_btn "  disabled={submitButtonDisabled} >Submit</button>
					<br/>
					{responseMessage ? (
						<p className='linkinfo' style={{ color: 'green', fontWeight: '800', marginTop: '3%' }}>
							{responseMessage}
						</p>
						) : (
						error && (
							<label className='erros' style={{ color: 'red', fontWeight: '700', paddingTop: '5%', fontSize: '20px' }}>
							{error}
							</label>
						)
						)} 
				</form>
			</div>
		</div>
	


    </div>
  )
}
