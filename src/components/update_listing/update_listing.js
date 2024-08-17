import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const UpdateListingPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [listing, setListing] = useState({
    description: '',
    price: '',
    currency: '',
    listing_photo: null,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`/api/update/${id}/`)
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
    formData.append('description', listing.description);
    formData.append('price', listing.price);
    formData.append('currency', listing.currency);
    if (listing.listing_photo) {
      formData.append('listing_photo', listing.listing_photo);
    }

    axios.put(`/api/update/${id}/`, formData)
      .then(() => history.push('/listings'))
      .catch(error => setError('Failed to update listing'));
  };

  return (
    <div>
      <h2>Update Listing</h2>
      <form onSubmit={handleSubmit}>
        <label>Description</label>
        <textarea name="description" value={listing.description} onChange={handleChange} />

        <label>Price</label>
        <input type="number" name="price" value={listing.price} onChange={handleChange} />

        <label>Currency</label>
        <input type="text" name="currency" value={listing.currency} onChange={handleChange} />

        <label>Listing Photo</label>
        <input type="file" name="listing_photo" onChange={handleFileChange} />

        <button type="submit">Update</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default UpdateListingPage;
