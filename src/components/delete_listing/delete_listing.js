import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const DeleteListingPage = () => {
  const { id } = useParams();
  const history = useHistory();

  const handleDelete = () => {
    axios.delete(`/api/delete/${id}/`)
      .then(() => history.push('/listings'))
      .catch(error => console.error('Failed to delete listing', error));
  };

  return (
    <div>
      <h2>Are you sure you want to delete this listing?</h2>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={() => history.goBack()}>No, Go Back</button>
    </div>
  );
};

export default DeleteListingPage;
