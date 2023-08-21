import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import newRequest from '../../utils/newRequest';
import getCurrentUser from '../../utils/getCurrentUser';
import { FaEdit, FaTrash } from 'react-icons/fa';

const MyAds = () => {
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ['myAds'],
    queryFn: () =>
      newRequest(`/posts?userId=${currentUser._id}`).then((res) => {
        console.log(data);
        console.log('Query function executed');
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myAds']);
    },
  });

  const handleDelete = (id) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this ad?');
    if (shouldDelete) {
      mutation.mutate(id);
    }
  };
  const handleEdit = (id) => {
    const shouldEdit = window.confirm('Are you sure you want to Edit this Ad?');
    if (shouldEdit) {
      navigate(`/edit-ad/${id}`);
    }
  };

  return (
    <div className="myAds">
      {isLoading ? (
        'Loading...'
      ) : error ? (
        'Error'
      ) : (
        <div className="container">
          <div className="title text-center">
            <label className="h4 text-right fw-bold m-3 mt-5 mb-0"></label>
          </div>
          {data.length === 0 ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin:"15% auto" }}>
              <p className='No ads' style={{ color: "red", fontWeight: "600", fontSize: "40px" }}>
                No ads Posted.
              </p>
            </div>
          ) : (
            <div className="card">
              <table className="table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th className="d-none d-md-table-cell">Description</th> {/* Hide on small screens */}
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((ad) => (
                    <tr key={ad._id}>
                      <td>
                        <img
                          src={ad.cover}
                          alt=""
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                      </td>
                      <td style={{ paddingTop: '4%' }}>{ad.title}</td>
                      <td className="d-none d-md-table-cell" style={{ paddingTop: '4%' }}>{ad.shortDesc}</td> {/* Hide on small screens */}
                      <td style={{ paddingTop: '4%' }}>{ad.price.toLocaleString()}</td>
                      <td style={{ paddingTop: '3.5%' }}>
                        <button className="btn edit ">
                          <FaEdit style={{ color: 'blue'  }} onClick={()=> handleEdit(ad._id)}/>
                        </button>
                        <button className="btn ">
                          <FaTrash style={{ color: 'red' }} onClick={() => handleDelete(ad._id)} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyAds;
 