import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaPhone, FaUser, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import getCurrentUser from "../../utils/getCurrentUser";
import { Button, Modal, Form } from "react-bootstrap"; // Import Bootstrap components
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Ad = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

     const [userData, setUserData] = useState(null);
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [selectedReason, setSelectedReason] = useState("");
    const [additionalDetails, setAdditionalDetails] = useState("");


  const currentUser = getCurrentUser();
  const currentUserId = currentUser?._id;
  const currentUserEmail = currentUser?.email;

  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["ad"],
    queryFn: () =>
      newRequest.get(`/posts/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    const fetchData = async () => {
      if (data && data.userId) {
        try {
          const response = await newRequest.get(`/user/${data.userId}`);
          const user = response.data;
          setUserData(user);
        } catch (error) {
          console.error('Error fetching User data:', error);
        }

      }
    };
  
    fetchData();
  }, [data]);



  const handleShowReportModal = () => {
    setShowReportModal(true);
  };

  const handleCloseReportModal = () => {
    setShowReportModal(false);
    setSelectedReason('');
    setAdditionalDetails('');
  };

  const handleReasonChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedReason(selectedValue);

    if (selectedValue !== 'other') {
      setAdditionalDetails('');
    }
  };

  



  const handleSubmitReport = async () => {
    const reportData = {
      sellerId: userData._id,
      adId: data._id,
      additionalDetails: additionalDetails,
      selectedReason: selectedReason || "nill",
      buyerId: currentUserId,
      buyerEmail: currentUserEmail,
    };
  
    try {
      await newRequest.post('/report/reportpost', reportData);
      window.alert("Report has been submitted");
    } catch (error) {
      console.error('Error Submitting Report:', error);

    }
  };


  const location = useLocation();

  const handleRedirectClick = () => {
    // Store the current location in local storage before redirecting
    localStorage.setItem("redirectPath", location.pathname);
  };
  
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };

  const closeSliderModal = () => {
    setShowModal(false);
    setSelectedImageIndex(null);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % data.images.length);
  };

  const handlePreviousImage = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex - 1 + data.images.length) % data.images.length
    );
  };



  const [viewportHeight, setViewportHeight] = useState(window.innerHeight * 0.7);

  useEffect(() => {
    const handleResize = () => {
      const newViewportHeight = window.innerWidth <= 768 ? window.innerHeight * 0.5 : window.innerHeight * 0.7;
      setViewportHeight(newViewportHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="gig">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-7 col-lg-8" style={{ position: 'relative',  background: '#000' 
        ,maxHeight: viewportHeight + 'px',
        overflow: 'hidden',}}>
             <Carousel>
        {data.cover && (
          <div
            key="cover"
            style={{
              cursor: 'pointer',
              height: viewportHeight + 'px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => openModal(-1)}
          >
            <img
              src={data.cover}
              alt="Cover"
              style={{
                objectFit: 'contain',
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        )}
        {data.images.map((img, index) => (
          <div
            key={index}
            style={{
              cursor: 'pointer',
              height: viewportHeight + 'px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => openModal(index)}
          >
            <img
              src={img}
              alt={``}
              style={{
                objectFit: 'contain',
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        ))}
      </Carousel>

      <Modal
        show={showModal}
        onHide={closeSliderModal}
        centered
        size="xl"
        dialogClassName="image-slider-modal"
      >
        <Modal.Body>
          {selectedImageIndex !== null && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                src={
                  selectedImageIndex === -1
                    ? data.cover
                    : data.images[selectedImageIndex]
                }
                alt={
                  selectedImageIndex === -1
                    ? 'Cover'
                    : `Image ${selectedImageIndex}`
                }
                style={{
                  objectFit: 'contain',
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  width: 'auto',
                  height: 'auto',
                }}
              />
              <div style={{ marginTop: '1rem', display: 'flex' }}>
                <FaArrowLeft
                  style={{ cursor: 'pointer' }}
                  onClick={handlePreviousImage}
                />
                <FaArrowRight
                  style={{ cursor: 'pointer', marginLeft: '1rem' }}
                  onClick={handleNextImage}
                />
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
            </div>
              
            <div className="col-md-5 col-lg-4 mt-3 mt-lg-0">
              <div className="card">
                <div className="card-body">
                  {/* User's name */}
                  <h5 className="card-title">{data?.ownername || "Seller"}</h5>
                  <p className="card-title" style={{ color: "grey" }}>
                    {data.userId}
                  </p>

                  {/* Phone number button */}
                  {currentUser ? (
                    <>
                      {showPhoneNumber ? (
                        <div className="row">
                          <div className="col">
                            <div
                              className="contact-number"
                              style={{
                                backgroundColor: "#a891b7",
                                width: "100%",
                                maxWidth: "350px",
                                color: "white",
                                border: "none",
                                padding: "0.3rem 0.7rem",
                                borderRadius: "5px",
                                cursor: "pointer",
                                transition: "all 0.3s",
                                textAlign: "center",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#a891b7";
                                e.target.style.color = "black";
                                e.target.style.boxShadow =
                                  "0 0 10px rgba(0, 0, 0, 0.5)";
                                e.target.style.transform = "scale(1.05)";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#a891b7";
                                e.target.style.color = "white";
                                e.target.style.boxShadow = "none";
                                e.target.style.transform = "scale(1)";
                              }}
                            >
                              {data.contact}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="row">
                          <div className="col">
                            <button
                              className="btn btn-primary btn-block"
                              style={{
                                backgroundColor: "#a891b7",
                                width: "100%",
                                maxWidth: "350px",
                                color: "white",
                                border: "none",
                                padding: "0.3rem 0.7rem",
                                borderRadius: "5px",
                                cursor: "pointer",
                                transition: "all 0.3s",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#a891b7";
                                e.target.style.color = "black";
                                e.target.style.boxShadow =
                                  "0 0 10px rgba(0, 0, 0, 0.5)";
                                e.target.style.transform = "scale(1.05)";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#a891b7";
                                e.target.style.color = "white";
                                e.target.style.boxShadow = "none";
                                e.target.style.transform = "scale(1)";
                              }}
                              onClick={() => setShowPhoneNumber(true)}
                            >
                              Show Phone Number
                              <FaPhone style={{ marginLeft: "8px" }} />
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="row">
                        <div className="col">
                          <NavLink
                            to="/signin"
                            className="service_button"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <button
                              className="btn btn-primary btn-block"
                              onClick={handleRedirectClick}
                              style={{
                                backgroundColor: "#a891b7",
                                width: "100%",
                                maxWidth: "350px",
                                color: "white",
                                border: "none",
                                padding: "0.3rem 0.7rem",
                                borderRadius: "5px",
                                cursor: "pointer",
                                transition: "all 0.3s",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#a891b7";
                                e.target.style.color = "black";
                                e.target.style.boxShadow =
                                  "0 0 10px rgba(0, 0, 0, 0.5)";
                                e.target.style.transform = "scale(1.05)";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#a891b7";
                                e.target.style.color = "white";
                                e.target.style.boxShadow = "none";
                                e.target.style.transform = "scale(1)";
                              }}
                            >
                              Login to View Contact
                              <FaPhone style={{ marginLeft: "8px" }} />
                            </button>
                          </NavLink>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Profile button */}
                  <div className="row mt-2">
                    <div className="col">
                      <NavLink
                        className="profile-link"
                        to={`/userprofile/${data.userId}`}
                      >
                        <button
                          style={{
                            width: "100%",
                            maxWidth: "350px",
                            backgroundColor: "#808080",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#808080";
                            e.target.style.color = "black";
                            e.target.style.boxShadow =
                              "0 0 10px rgba(0, 0, 0, 0.5)";
                            e.target.style.transform = "scale(1.05)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "#808080";
                            e.target.style.color = "white";
                            e.target.style.boxShadow = "none";
                            e.target.style.transform = "scale(1)";
                          }}
                          className="btn btn-secondary btn-block"
                        >
                          <FaUser style={{ marginRight: "8px" }} />
                          Show User Profile
                        </button>
                      </NavLink>


                    </div>
                    
                    
                  </div>
                  <div className="row mt-2">
                    <div className="col">
      {/* Button to open the report modal */}
      {currentUser ? (<>
      <button 
      style={{
        width: "100%",
        maxWidth: "350px",
        backgroundColor: "#FF0000",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#FF0000";
        e.target.style.color = "black";
        e.target.style.boxShadow =
          "0 0 10px rgba(0, 0, 0, 0.5)";
        e.target.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "#808080";
        e.target.style.color = "white";
        e.target.style.boxShadow = "none";
        e.target.style.transform = "scale(1)";
      }}

      className="btn " onClick={handleShowReportModal}>
       
        Report This Ad
      </button>

       
       <Modal show={showReportModal} onHide={handleCloseReportModal}>
        <Modal.Header closeButton>
          <Modal.Title>Report This Ad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group controlId="reason">
              <Form.Label>Reason for reporting:</Form.Label>
              <Form.Control as="select" value={selectedReason} onChange={handleReasonChange} required>
                <option value="" disabled>Select a reason</option>
                <option value="nudity">Nudity</option>
                <option value="violence">Violence</option>
                <option value="harassment">Harassment</option>
                <option value="suicide">Suicide or Self Injury</option>
                <option value="falseinfo">False Information</option>
                <option value="spam">Spam</option>
                <option value="unauthsales">Unauthorized Sales</option>
                <option value="hatespeech">Hate Speech</option>
                <option value="terrorism">Terrorism</option>
                <option value="other">Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="details">
              <Form.Label>Additional Details:</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Maximum characters 120"
                rows={3}
                value={additionalDetails}
                onChange={(e) => {
                  if (e.target.value.length <= 120) {
                    setAdditionalDetails(e.target.value);
                  }
                }}
                disabled={selectedReason !== 'other'}
                required={selectedReason === 'other'}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReportModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { handleCloseReportModal(); handleSubmitReport(); }}>
            Submit Report
          </Button>
        </Modal.Footer>
      </Modal>
      </>):( 
      <>
      <NavLink to="/signin">
      
        <button
      style={{
        width: "100%",
        maxWidth: "350px",
        backgroundColor: "#FF0000",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#FF0000";
        e.target.style.color = "black";
        e.target.style.boxShadow =
          "0 0 10px rgba(0, 0, 0, 0.5)";
        e.target.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "#808080";
        e.target.style.color = "white";
        e.target.style.boxShadow = "none";
        e.target.style.transform = "scale(1)";
      }}

      className="btn "
      onClick={handleRedirectClick} >
       
        Report This Ad
      </button>

      </NavLink>
        </>)}

    </div>
    </div>
                </div>
                
              </div>
              {/* Car Inspection card */}
              <div className="card mt-4">
                <div className="card-body">
                  <h5 className="card-title">Car Inspection</h5>
                  <p>Find out the real condition of this car. Starting from Rs 3500</p>
                  {currentUser ? (
                    <NavLink
                      to="/service-form"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <button
                        style={{
                          backgroundColor: "#a891b7",
                          width: "100%",
                          maxWidth: "350px",
                          color: "white",
                          border: "none",
                          padding: "0.3rem 0.7rem",
                          borderRadius: "5px",
                          cursor: "pointer",
                          transition: "all 0.3s",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#a891b7";
                          e.target.style.color = "black";
                          e.target.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
                          e.target.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "#a891b7";
                          e.target.style.color = "white";
                          e.target.style.boxShadow = "none";
                          e.target.style.transform = "scale(1)";
                        }}
                        className="btn btn-primary"
                      >
                        Schedule Inspection
                        <FaSearch
                          style={{ marginLeft: "8px", marginBottom: "2px" }}
                        />
                      </button>
                    </NavLink>
                  ) : (
                    <NavLink
                      to="/signin"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <button
                        style={{
                          backgroundColor: "#a891b7",
                          width: "100%",
                          maxWidth: "350px",
                          color: "white",
                          border: "none",
                          padding: "0.3rem 0.7rem",
                          borderRadius: "5px",
                          cursor: "pointer",
                          transition: "all 0.3s",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#a891b7";
                          e.target.style.color = "black";
                          e.target.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
                          e.target.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "#a891b7";
                          e.target.style.color = "white";
                          e.target.style.boxShadow = "none";
                          e.target.style.transform = "scale(1)";
                        }}
                        onClick={() => {
                          window.alert("You're not logged in. Please login!");
                        }}
                        className="btn btn-primary"
                      >
                        Schedule Inspection
                        <FaSearch
                          style={{ marginLeft: "8px", marginBottom: "2px" }}
                        />
                      </button>
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            {/* Additional Card for price */}
            {/* Card for Price, Short Description, and Location */}
            <div className="col-md-7 col-lg-8">
              <div className="card">
                <div className="card-body">
                  {/* Price */}
                  <h2 className="text-uppercase" style={{ fontWeight: "bold" }}>{data.title}</h2>
                  <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <h4 style={{ margin: 0, marginRight: "1.5%" }}>PKR</h4>
                    <h3 style={{ fontWeight: 'bold', margin: 0 }}>{data.price.toLocaleString()}</h3>
                  </div>

                  {/* Location */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaMapMarkerAlt style={{ marginRight: '2px' }} />
                    <p className="pt-3">{data.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Card for Vehicle Details */}
          <div className="row mt-4">
            <div className="col-md-7 col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title pb-3">Details</h3>
                  <div className="row">
                    <div className="col-sm-6 mb-3">
                      <p><strong>Vehicle Make: </strong>{data.vehiclemake}</p>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <p><strong>Vehicle Model: </strong>{data.vehiclemodel}</p>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <p><strong>Vehicle Variant: </strong>{data.vehiclevarient}</p>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <p><strong>Transmission: </strong>{data.transmission}</p>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <p><strong>Mileage: </strong>{data.mileage.toLocaleString()} <span className="km" style={{ color: "grey" }}>km</span></p>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <p><strong>Fuel Type: </strong>{data.fueltype}</p>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <p><strong>Registry Year: </strong>{data.registeryear}</p>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <p><strong>Registry City: </strong>{data.registercity}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4 pb-3">
            <div className="col-md-7 col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Description</h5>
                  <p>{data.desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ad;