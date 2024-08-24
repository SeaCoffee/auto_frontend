import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CarListingsListPage = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/listings/list/')
      .then(response => {
        console.log(response.data);  // Проверка структуры данных
        setListings(response.data.data);  // Обращаемся к полю data, содержащему массив
      })
      .catch(error => setError('Failed to load listings'));
  }, []);

  const containerStyle = {
  padding: '20px',
  maxWidth: '800px',
  margin: 'auto'
};

const listStyle = {
  listStyleType: 'none',
  padding: 0
};

const listItemStyle = {
  padding: '10px',
  margin: '10px 0',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#f9f9f9',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center' // Центрирование элементов внутри пункта списка
};

const linkStyle = {
  textDecoration: 'none',
  color: '#007bff',
  marginTop: '10px'
};

const errorStyle = {
  color: 'red',
  fontWeight: 'bold'
};

const imgStyle = {
  maxWidth: '100%', // Ограничивает изображение максимальной шириной элемента списка
  height: 'auto', // Поддерживает пропорции изображения
  borderRadius: '4px', // Скругление углов изображения
  margin: '10px 0' // Отступ сверху и снизу изображения
};

return (
  <div style={containerStyle}>
    <h2>Car Listings</h2>
    {error && <p style={errorStyle}>{error}</p>}
    <ul style={listStyle}>
      {listings && listings.length > 0 ? (
        listings.map(listing => (
          <li key={listing.id} style={listItemStyle}>
            <h3>{listing.title}</h3>
            <p>{listing.description}</p>
            {listing.listing_photo && (
              <img src={listing.listing_photo} alt={listing.title} style={imgStyle} />
            )}
            <Link to={`/details/${listing.id}`} style={linkStyle}>View Details</Link>
          </li>
        ))
      ) : (
        <p>No listings available.</p>
      )}
    </ul>
  </div>
);

};

export default CarListingsListPage;


