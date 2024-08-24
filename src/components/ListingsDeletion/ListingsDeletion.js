import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DeleteListingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = React.useState('');

  const handleDelete = () => {
    axios.delete(`api/listings/delete/${id}/`)
      .then(() => {
        navigate('/listingsuser');
      })
      .catch(err => {
        setError('Failed to delete listing');
      });
  };

  return (
    <div>
      <h2>Are you sure you want to delete this listing?</h2>
      {error && <p>{error}</p>}
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={() => navigate('/listingsuser')}>Cancel</button>
    </div>
  );
};

export default DeleteListingPage;
