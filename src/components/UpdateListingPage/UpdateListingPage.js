import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateListingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();  // Получаем id из URL
  const [listing, setListing] = useState({
    title: '',
    description: '',
    price: '',
    currency: '',
    listing_photo: null,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`/api/listings/details/${id}/`)
      .then(response => setListing(response.data))
      .catch(error => setError('Failed to load listing data'));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListing({ ...listing, [name]: value });
  };

  const handleFileChange = (e) => {
    setListing({ ...listing, listing_photo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', listing.title);
    formData.append('description', listing.description);
    formData.append('price', listing.price);
    formData.append('currency', listing.currency);
    if (listing.listing_photo) {
      formData.append('listing_photo', listing.listing_photo);
    }

    axios.put(`/api/listings/update/${id}/`, formData)
      .then(() => navigate('/listingsuserlist'))
      .catch(error => {
        const serverError = error.response?.data || 'Failed to update listing';
        setError(serverError);
        console.error('Error updating listing:', serverError);
      });
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',
    margin: 'auto',
    gap: '10px',
  };

  const inputStyle = {
    padding: '8px 10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px'
  };

  const labelStyle = {
    marginBottom: '5px',
    fontWeight: 'bold'
  };

  const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  };

  const errorStyle = {
    color: 'red',
    fontWeight: 'bold'
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Update Listing</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle}>Title</label>
        <input type="text" name="title" value={listing.title} onChange={handleChange} style={inputStyle} />

        <label style={labelStyle}>Description</label>
        <textarea name="description" value={listing.description} onChange={handleChange} style={{ ...inputStyle, height: '100px' }} />

        <label style={labelStyle}>Price</label>
        <input type="number" name="price" value={listing.price} onChange={handleChange} style={inputStyle} />

        <label style={labelStyle}>Currency</label>
        <input type="text" name="currency" value={listing.currency} onChange={handleChange} style={inputStyle} />

        <label style={labelStyle}>Listing Photo</label>
        <input type="file" name="listing_photo" onChange={handleFileChange} style={inputStyle} />

        <button type="submit" style={buttonStyle}>Update</button>
      </form>
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
};

export default UpdateListingPage;
