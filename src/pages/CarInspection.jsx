import React from 'react';
import { NavLink,useLocation } from 'react-router-dom';


export default function CarInspection() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const location = useLocation();

  const handleRedirectClick = () => {
    // Store the current location in local storage before redirecting
    localStorage.setItem("redirectPath", location.pathname);
  };
  


  return (   
<div>
      <div>
      <img 
        src="carin.jpg" 
        alt="/" 
        className="img-fluid "
        style={{
          height: '100vh',
          objectFit: 'cover',
          maxWidth: '100%',
          width: '100%',
        }}
      />

</div>


  <div className='container '>
      <h1 className='text-center pb-5 pt-5'style={{ fontWeight: 'bold', fontFamily: 'Georgia, serif', borderBottom: '1px solid #ccc', }}>Car Inspection</h1>
      {currentUser ? ( <>
                <div className='mt-5 mb-5 row justify-content-center align-items-center'>
  <div className='col-md-6 col-lg-6 col-12'>  
    <label className='label d-block text-center mb-3' style={{ fontWeight: "800", fontSize: "1.8em" }}>Get Service Now!</label> 
    <div className='text-center'>
           <NavLink to="/service-form" style={{ textDecoration: 'none', color: 'inherit' }}>  <button
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
              >     Service Form
              </button>  </NavLink>
       </div>
       </div>
       </div>
          
          </>
  ) : (<>
          <div className='mt-5 mb-5 row justify-content-center align-items-center'>
  <div className='col-md-6 col-lg-6 col-12'>  
    <label className='label d-block text-center mb-3' style={{ fontWeight: "800", fontSize: "1.8em" }}>Get Service Now!</label> 
    <div className='text-center'>
      <NavLink to="/signin" className="service_button" style={{ textDecoration: 'none', color: 'inherit' }}>
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
          onClick={() => {
            handleRedirectClick();
            window.alert("You'r not Logged in. Kingly login!");
          }}
        >
          Click here
        </button> 
        </NavLink>
        </div>
        </div>
       </div> 
  </>)}
      At SHAMPY, we offer comprehensive car inspection services to help you make an informed decision when buying or maintaining a vehicle. We understand that a car can be a significant investment, and we want to ensure that you're getting the most value for your money.
    </div>
                <br/>
    <div className='CarInspection_text container' style={{ fontSize: '1rem' }}>
    <p>Our team of experienced and certified inspectors uses state-of-the-art equipment and technology to perform thorough inspections of your vehicle. We follow a rigorous checklist that covers all the major components and systems of your car, including the engine, transmission, brakes, suspension, electrical system, and more. Our inspections are designed to identify any issues or potential problems with the vehicle and provide you with a detailed report.</p>

    <p>Here are some of the specific car inspection services that we offer:</p>

    <h4>Pre-purchase inspections:</h4>
    <p>Before buying a used car, it's important to have it inspected by a professional. Our pre-purchase inspections are designed to give you a complete picture of the vehicle's condition. We'll check the exterior, interior, and under the hood, looking for any signs of damage, wear and tear, or hidden problems. Our inspection report will provide you with an objective assessment of the vehicle's condition, including any issues that may affect its value or safety.</p>


    <h4>Safety inspections:</h4>
    <p>Safety is our top priority, and we take it seriously. Our safety inspections are designed to check the vehicle's brakes, tires, steering, suspension, and other critical components to ensure that they are in good working order. We'll also check for any warning lights or other indicators that may suggest a problem. Our inspection report will provide you with peace of mind, knowing that the vehicle is safe and roadworthy.</p>

    <h4>Emissions inspections:</h4>
    <p>Many states require emissions inspections to ensure that vehicles meet local air quality standards. Our emissions inspections are designed to check the vehicle's exhaust system, looking for any leaks or malfunctions that may cause it to emit more pollutants than allowed. We'll also check the vehicle's OBD-II system to make sure that it's functioning correctly. Our inspection report will provide you with a certificate of compliance, which you can use to register the vehicle with the DMV.</p>

    <h4>Regular inspections:</h4>
    <p>Regular inspections are an essential part of keeping your vehicle running smoothly and preventing potential problems. We offer routine inspections that cover all the major components of your car, from the engine to the tires. We'll check for any signs of wear and tear, damage, or other issues that may need attention. Our inspection report will provide you with a list of recommended repairs or maintenance, helping you keep your car in top condition.</p>

    <p>At SHAMPY, we pride ourselves on our commitment to quality and customer satisfaction. We believe that our car inspection services provide exceptional value and peace of mind to our customers. We offer competitive pricing, transparent communication, and a friendly and knowledgeable staff. We're here to help you make informed decisions about your vehicle, and we look forward to serving you.</p>
          

  
  </div>

</div>
  );
};

 
