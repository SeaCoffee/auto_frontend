import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListingListPage = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/listings/list/')
      .then(response => setListings(response.data.results))
      .catch(error => console.error('Failed to load listings', error));
  }, []);

  return (
    <div>
      <h2>Listings</h2>
      <ul>
        {listings.map(listing => (
          <li key={listing.id}>
            <h3>{listing.title}</h3>
            <p>{listing.description}</p>
            <img src={listing.listing_photo} alt={listing.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListingListPage;
