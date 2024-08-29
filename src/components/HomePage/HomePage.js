import React, { useState } from "react";
import {Link, Route} from 'react-router-dom';
import UsersDetailsPage from "../UsersDetailsPage/UsersDetailsPage";
import PasswordRecoveryRequest from "../RecoveryPassword/PasswordRecoveryRequest";
import PasswordReset from "../RecoveryPassword/PasswordReset";

const LinkItem = ({ to, children }) => {
  const [hover, setHover] = useState(false);

  const linkStyle = {
    textDecoration: 'none',
    color: hover ? '#0056b3' : 'black', // Цвет текста изменяется при наведении
    backgroundColor: hover ? '#e8f0fe' : 'transparent', // Фоновый цвет при наведении
    padding: '10px',
    borderRadius: '5px',
    display: 'block', // Расширяет кликабельную область
    cursor: 'pointer'
  };

  return (
    <li style={{ marginBottom: '5px', fontSize: '16px' }}>
      <Link
        to={to}
        style={linkStyle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {children}
      </Link>
    </li>
  );
};

const links = [

    { path: '/registration', label: 'Registration' },
  { path: '/logIn', label: 'Log In' },
  { path: '/activate/:token', label: 'Activate Account (open from email follow link)' },
  { path: '/profile', label: 'User Profile (if you have)' },
    { path: '/addavatar', label: 'Add Avatar' },
    { path: '/upgradeaccount', label: 'Upgrade Account' },
  { path: '/deleteaccount', label: 'Delete Account' },
  { path: '/logout', label: 'Log Out' },
    { path: "/recoverpassword", label: 'new password request'},
    {path: "/recovery/:token", label: 'reset password'},


     { path: '/createmanager', label: 'Create Manager (for superuser)' },
     { path: '/addblacklist', label: 'Add to Blacklist (for manager)' },
  { path: '/removeblacklist', label: 'Remove from Blacklist (for manager)' },



  { path: '/listingcreate', label: 'Create Listing' },
      { path: '/listings/update/:id', label: 'Update Listing' },

      { path: '/list', label: 'All Car Listings' },
 { path: '/details/:id', label: 'Car Listing Details including stats for premium sellers (open page from All Car Listings)' },
   { path: '/listingsuser', label: "User's Listings" },
  { path: '/listings/:id', label: 'Listing Detail (open page from User\'s Listings)' },
        { path: '/delete/:id', label: 'Delete Listing (open page from User\'s Listings)' },


];

const HomePage = () => {
    return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      backgroundColor: '#f4f4f4'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between', // Размещает дочерние элементы на противоположных концах
        alignItems: 'center',
        width: '100%' // Занимает всю доступную ширину
      }}>
        <div style={{ textAlign: 'left' }}> {/* Контейнер для заголовка */}
          <h2>Welcome to Car Sales!</h2>
        </div>
        <div style={{ textAlign: 'right' }}> {/* Контейнер для информации о пользователе */}
          <UsersDetailsPage />
        </div>
      </div>

          <nav style={{ marginTop: '20px' }}>
        <ul style={{
          listStyleType: 'none',
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          backgroundColor: '#fff',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          borderRadius: '5px',
          overflow: 'auto'
        }}>
          {links.map(({ path, label }) => (
            <LinkItem to={path} key={path}>{label}</LinkItem>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;

