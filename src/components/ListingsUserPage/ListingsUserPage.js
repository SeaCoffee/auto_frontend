import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ListingsUserPage = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState('');
  const [notifications, setNotifications] = useState({});
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('api/listings/user/')
      .then(response => {
        console.log('Listings:', response.data.data);
        setListings(response.data.data);
      })
      .catch(() => setError('Failed to load listings'));
  }, []);

  useEffect(() => {
    const connectToNotifications = async () => {
      try {
        const socketToken = await axios.get('/api/auth/soket/');
        if (socketToken) {
          const newSocket = new WebSocket(`ws://localhost/api/notifications/?token=${socketToken.data.token}`);

          newSocket.onopen = () => {
            console.log('WebSocket connected for notifications');
          };

          newSocket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('Received new message notification:', message);
            setNotifications(prevNotifications => ({
              ...prevNotifications,
              [message.listingId]: (prevNotifications[message.listingId] || 0) + 1
            }));
          };

          newSocket.onclose = () => {
            console.log('WebSocket disconnected for notifications');
          };

          setSocket(newSocket);
        }
      } catch (error) {
        console.error('Failed to connect to WebSocket:', error);
      }
    };

    connectToNotifications();

    return () => {
      if (socket) {
        console.log('Disconnecting WebSocket for notifications');
        socket.close();
      }
    };
  }, [socket]);

  const openChat = (listingId) => {
    setNotifications(prevNotifications => ({
      ...prevNotifications,
      [listingId]: 0
    }));
    navigate(`/chat/${listingId}`);
  };

  if (error) {
    return <p>{error}</p>;
  }

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

  const notificationStyle = {
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '50%',
    padding: '5px 10px',
    marginLeft: '10px'
  };

  const buttonStyle = {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '8px',
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
            <span>{listing.title}</span>
            {notifications[listing.id] && (
              <span style={notificationStyle}> ({notifications[listing.id]} new messages)</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListingsUserPage;



