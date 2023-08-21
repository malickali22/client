import React, { useEffect, useState } from 'react';
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
import newRequest from '../utils/newRequest';
import Lottie from 'lottie-react';
import { useParams } from "react-router-dom";
import animationData from '../assets/animation_ll3p52e2.json';
export const UserProfile = () => {

    const { id } = useParams();

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchAdData = async () => {
          try {
            
            const response = await newRequest.get(`/user/${id}`);
            const user = response.data;
    
            // Set the formData state with the fetched ad data
            setUserData(user);
        
            // Set the selectedMake state based on the fetched vehiclemake from the ad data
            
          } catch (error) {
            console.error('Error fetching ad data:', error);
          }
        };
        fetchAdData();
      }, [id]);  
      

    const { isLoading, error, data } = useQuery({
        queryKey: ["ads"],
        queryFn: () =>
          newRequest.get(`/posts/userposts/${id}`).then((res) => {
            return res.data;
          }),
      });


  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="text-center">
          <div className="profilelogo" style={{ height: "200px", width: "200px", margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Lottie animationData={animationData}></Lottie>
            </div>
            <h2>{userData?.firstname} {userData?.lastname}</h2>
            <div className="mt-3">
              <div className="mb-2">
                <button className="btn btn-outline-primary">Share Profile</button>
              </div>
              <div className="mb-2">
                <button className="btn btn-outline-danger">Report User</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8  mb-5">
         
          <hr />
          <p>Published Ads:</p>
          {isLoading ? (
        <div className="loading-message" style={{display:"flex", justifyContent: "center", alignItems: "center", fontSize: "24px", fontWeight: "bold", marginTop: "10%", marginBottom: "10%" }}>Loading...</div>
        ) : error ? (
        <div className="error-message" style={{ display:"flex", justifyContent: "center", alignItems: "center", fontSize: "24px", fontWeight: "bold", color: "red", marginTop: "10%", marginBottom: "10%"  }}>Something went wrong!</div>
        ) : (
          <div className="row">
            {data.map((ad) => (
                <div className="col-12 col-md-6 col-lg-4" key={ad._id}>
                <div className="card mb-4">
                    <div style={{ height: '200px', overflow: 'hidden' }}>
                    <img
                        src={ad.cover}
                        className="card-img-top"
                        alt="Ad"
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                    </div>
                    <div className="card-body">
                    <h5 className="card-title">{ad.price.toLocaleString()}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{ad.title}</h6>
                    <p className="card-subtitle mb-2 text-muted">{ad.location}</p> <br/>
                    <Link to={`/ad/${ad._id}`}>
                        <button className="btn btn-primary mt-2">Show Full Ad</button>
                    </Link>
                    </div>
                </div>
                </div>
            ))}
            </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default UserProfile;