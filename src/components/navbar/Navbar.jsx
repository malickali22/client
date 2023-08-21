import React, { useEffect} from 'react';
import { NavLink, useLocation, Link, useNavigate } from 'react-router-dom';
import Hoverbutton from '../../pages/Stylings/Navbarbtn'
import newRequest from '../../utils/newRequest'
import Lottie from 'lottie-react';
import animationData from '../../assets/animation_ll3k6l7n.json';
import "./Navbar.css"

export default function Navbar() {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };


  const handleRedirectMyads = async () =>{
    try{
        navigate("/myads")
    }catch (err){
      console.log(err);
    }
  };
 

  const handleRedirectNewAd = async () =>{
    try{
        navigate("/create-ad")
    }catch (err){
      console.log(err);
    }
  };


  const handleRedirectMessages = async () =>{
    try{
        navigate("/message")
    }catch (err){
      console.log(err);
    }
  };
  const handleRedirectMyProfile = async () =>{
    try{
        navigate("/user")
    }catch (err){
      console.log(err);
    }
  };

  const location = useLocation();

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const navbar = document.querySelector('.navbar-collapse');
    if (screenWidth < 768) {
      navbar.classList.remove('show');
    }
  }, [location]);

  return (

    <div>
       <nav className={ `navbar navbar-expand-lg bg-body-tertiary`}>
        <div className="container-fluid" style={{ marginTop:'-5px', marginBottom: '-5px' }}>
        <a className="navbar-brand" href="/" style={{ marginTop: '1px', marginBottom:'5px'}}>
           <img className="img-fluid" src="../logo.svg" alt="Shampy" style={{ height: '25px',  mixBlendMode: 'multiply', }} />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <div className='navbar-toggle' style={{ width: '40px', height: '40px', color:"black"}}>
            <Lottie animationData={animationData} color={"black"} />
            </div>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link nv "   style={{ textDecoration: 'none' }}>
                <Hoverbutton>Home</Hoverbutton>
              </NavLink>
            </li>

              <li className="nav-item dropdown">
                <NavLink to="/Services" className="nav-link dropdown-toggle  nv" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                    style={{ textDecoration: 'none' }}>
                   <Hoverbutton>Services</Hoverbutton>
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to="/car-inspect" className="dropdown-item nv"   style={{ textDecoration: 'none' }}>
                    <Hoverbutton>Car Inspection</Hoverbutton>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/car-repair" className="dropdown-item nv"   style={{ textDecoration: 'none' }}>
                    <Hoverbutton>Car Repair</Hoverbutton>
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink to="/About" className="nav-link  nv"   style={{ textDecoration: 'none' }}>
                <Hoverbutton>About us</Hoverbutton>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/Contact" className="nav-link  nv"   style={{ textDecoration: 'none' }}>
                <Hoverbutton>Contact us</Hoverbutton>
                </NavLink>
              </li>
            </ul>

            <div className="d-flex ms-2" style={{ paddingRight: '10px' }}>
          {currentUser ? (
            <div className="user" >
              {/* <img src={currentUser.img || "/img/noavatar.jpg"} alt="" /> */}
              
              <li className="nav-item dropdown" style={{ listStyle: 'none', marginRight: '1rem' }}>
                <div  className=" dropdown-toggle  nv" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                   >
                    <img src="./profile-username.png" alt="" />
                   <Hoverbutton>{currentUser?.firstname} {currentUser?.lastname}</Hoverbutton>
            
                   <ul className="dropdown-menu">
                  <li>
                      <Link to="/myads" className="dropdown-item nv"   style={{ textDecoration: 'none' }} onClick={handleRedirectMyads} >
                      <Hoverbutton>My Ads</Hoverbutton>
                      </Link>
                  </li>
                  <li>
                      <Link to="/create-ad" className="dropdown-item nv"   style={{ textDecoration: 'none' }} onClick={handleRedirectNewAd} >
                      <Hoverbutton>New Ad</Hoverbutton>
                      </Link>
                      </li>
                      <li>
                      <Link className="dropdown-item nv"   style={{ textDecoration: 'none' }} to="/messages" onClick={handleRedirectMessages}>
                      <Hoverbutton>Messages</Hoverbutton>
                     </Link>
                     </li>
                     <li>
                      <Link className="dropdown-item nv"   style={{ textDecoration: 'none' }} to="/user" onClick={handleRedirectMyProfile}>
                      <Hoverbutton>My Profile</Hoverbutton>
                     </Link>
                     </li>
                     <li>
                     <Link className="dropdown-item nv"   style={{ textDecoration: 'none' }} onClick={handleLogout}>
                     <Hoverbutton>Logout</Hoverbutton>
                     </Link>
                     </li>
                     </ul>
                </div>
                </li>
             
            </div>
          ) : (
            <>
               <NavLink to="/Signin" style={{ textDecoration: 'none', color: 'inherit' }}>  <button
                style={{
                  backgroundColor: '#a891b7',
                  color: 'white',
                  border: 'none',
                  padding: '0.3rem 0.7rem',
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
              >     Sign in
              </button>  </NavLink>
            </>
          )}
              
           

            </div>

          </div>
        </div>
      </nav>
    </div>
  );
}