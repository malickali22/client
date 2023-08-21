import React from 'react';
import { NavLink,useLocation } from 'react-router-dom';
export default function CarRepair() {

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
        src="carre.jpg" 
        alt="/" 
        className="img-fluid"
        style={{
          height: '100vh',
          objectFit: 'cover',
          maxWidth: '100%',
          width: '100%',
        }}
      />

      <style>
        {`
          @media (max-width: 576px) {
            img {
              height: auto;
              max-height: 70vh;
            }
          }
        `}
      </style>
</div>
  
          <div className='container p-5'>
          <div className='CarInspection_text container' style={{ fontSize: '1rem' }}>
          <h1 className='text-center pb-5 pt-5'style={{ fontWeight: 'bold', fontFamily: 'Georgia, serif' , borderBottom: '1px solid #ccc', }}>Car Repair</h1>
            <div className='line'></div>
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
            handleRedirectClick()
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

          <br/>
          
              At SHAMPY, we are a team of highly skilled and experienced mechanics who are dedicated to providing top-notch car repair services to our customers. We understand that car repairs can be stressful and inconvenient, so we strive to make the process as smooth and painless as possible.
<br/>

<p>Our team has years of experience working on all types of vehicles, including cars, trucks, SUVs, and more. We have the knowledge and expertise to diagnose and repair any car problem quickly and efficiently. We use state-of-the-art equipment and technology to ensure that your car receives the highest quality repair services.</p>

              <br/>
              <p>We offer a wide range of car repair services to meet all of your needs, including:
              </p><br/>
              <h4>Engine diagnostics and repair:</h4><p> Our mechanics are experts in diagnosing and repairing engine problems, including issues with the fuel system, ignition system, and more.
              </p><br/>
              <h4>Brake repair and replacement:</h4><p> Your brakes are one of the most important safety features of your car. Our mechanics can quickly diagnose and repair any brake problems, including issues with the brake pads, rotors, and calipers.
              </p><br/>
              <h4>Suspension repair and alignment:</h4><p> A well-maintained suspension system is essential for a smooth and comfortable ride. Our mechanics can diagnose and repair any issues with your suspension system, including shocks, struts, and alignment.
              </p><br/>
              <h4>Transmission repair and replacement:</h4><p> Your car's transmission is a complex system that requires expert care. Our mechanics are skilled in diagnosing and repairing any transmission issues, including problems with the clutch, gears, and more.
              </p><br/>
              <h4>Electrical system repair:</h4><p> Today's cars rely heavily on complex electrical systems to function properly. Our mechanics have the expertise to diagnose and repair any issues with your car's electrical system, including problems with the battery, alternator, and more.
              </p><br/>
              <p>At SHAMPY, we are committed to providing our customers with the highest quality car repair services at competitive prices. We understand that car repairs can be expensive, which is why we offer upfront pricing and transparent communication throughout the repair process. Our goal is to provide our customers with the best possible value for their money.
              </p><br/>
              </div>
                

             
  
  </div>

</div>
  );
};