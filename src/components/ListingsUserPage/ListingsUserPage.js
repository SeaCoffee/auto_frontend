import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ListingsUserPage = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
  axios.get('api/listings/user/')
    .then(response => {
      console.log(response.data.data);  // Выводим данные в консоль
      setListings(response.data.data);
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
  margin: '5px 0',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#f9f9f9'
};

const linkStyle = {
  textDecoration: 'none',
  color: '#007bff',
  marginLeft: '15px',
};

const errorStyle = {
  color: 'red',
  fontWeight: 'bold'
};

return (
  <div style={containerStyle}>
    <h2>Your Listings</h2>
    {error && <p style={errorStyle}>{error}</p>}
    <ul style={listStyle}>
      {listings.map(listing => (
        <li key={listing.id} style={listItemStyle}>
          {listing.title} - {listing.description}
          <Link to={`/listings/update/${listing.id}`} style={linkStyle}>Edit</Link>
          <Link to={`/listings/${listing.id}`} style={linkStyle}>View</Link>
          <Link to={`/delete/${listing.id}`} style={linkStyle}>Delete</Link>
        </li>
      ))}
    </ul>
  </div>
);

};
export default ListingsUserPage;



