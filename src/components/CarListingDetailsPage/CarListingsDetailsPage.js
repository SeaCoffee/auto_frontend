import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';



const CarListingDetailPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);

  // Первый useEffect для декодирования токена
  useEffect(() => {
    console.log('Attempting to decode token...');
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log('Token decoded:', decodedToken);
        setUserData(decodedToken);
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    } else {
      console.error('Token not found');
    }
  }, []);

  // Второй useEffect для выполнения запросов
  useEffect(() => {
    if (userData) {
      console.log('Fetching listing data...');
      axios.get(`/api/listings/details/${id}/`)
        .then(response => {
          console.log('Listing data:', response.data);
          setListing(response.data);
        })
        .catch(error => {
          console.error('Failed to load listing details:', error);
          setError('Failed to load listing details');
        });

      if (userData.account_type === 'premium') {
        console.log('Fetching statistics...');
        axios.get(`/api/listings/premium/${id}/stats/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(response => {
            console.log('Stats data:', response.data);
            setStats(response.data);
          })
          .catch(error => {
            console.error('Failed to load statistics:', error);
            setError('Failed to load statistics');
          });
      }
    }
  }, [userData, id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!listing) {
    return <p>Loading listing...</p>;
  }

  const containerStyle = {
  padding: '20px',
  maxWidth: '600px',
  margin: 'auto',
  border: '1px solid #ccc',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
};

const imgStyle = {
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
  margin: '20px 0',
};

const titleStyle = {
  fontSize: '24px',
  marginBottom: '10px',
  color: '#333',
};

const priceStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '10px 0',
};

const detailStyle = {
  fontSize: '16px',
  marginBottom: '10px',
  color: '#555',
};

const statsContainerStyle = {
  marginTop: '20px',
  padding: '10px',
  backgroundColor: '#e9ecef',
  borderRadius: '8px',
};

const statItemStyle = {
  marginBottom: '8px',
  fontSize: '16px',
};

return (
  <div style={containerStyle}>
    <h2 style={titleStyle}>{listing.title}</h2>
    <p style={detailStyle}>{listing.description}</p>
    <p style={priceStyle}>Price: {listing.price} {listing.currency}</p>
    <p style={detailStyle}>Year: {listing.year}</p>
    <p style={detailStyle}>Engine: {listing.engine}</p>
    {listing.listing_photo && (
      <img src={listing.listing_photo} alt={listing.title} style={imgStyle} />
    )}

    {stats && (
      <div style={statsContainerStyle}>
        <h3>Statistics</h3>
        <p style={statItemStyle}>Total Views: {stats.views_data.total_views}</p>
        <p style={statItemStyle}>Average Price in Region: {stats.average_price_by_region}</p>
        <p style={statItemStyle}>Average Price in Country: {stats.average_price_by_country}</p>
      </div>
    )}
  </div>
);

};

export default CarListingDetailPage