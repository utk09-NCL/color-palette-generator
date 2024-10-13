import React from 'react';
import { FaGithub } from 'react-icons/fa'; // You can use react-icons for the GitHub icon

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={leftStyle}>Color Conjure</div>
      <div style={middleStyle}>
        <p>
          <a href="/disclaimer" style={linkStyle}>Disclaimer</a>: This website uses Seline for tracking, but it is privacy friendly and does not use cookies. More details can be found on their website
        </p>
      </div>
      <div style={rightStyle}>
        <a href="https://github.com/utk09-NCL/color-palette-generator" target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} style={iconStyle} />
        </a>
      </div>
      <div style={bottomStyle}>Copyright ©️ 2024. All rights reserved.</div>
    </footer>
  );
};

// Styles for the footer
const footerStyle = {
  backgroundColor: '#f0f8ff', // Light blue
  padding: '10px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'fixed',
  bottom: 0,
  width: '100%',
  flexDirection: 'column',
  boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
};

const leftStyle = {
  alignSelf: 'flex-start',
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#333',
  flex: 1,
};

const middleStyle = {
  textAlign: 'center',
  flex: 1,
};

const linkStyle = {
  color: '#ff7f50', // Light orange for the link
  textDecoration: 'none',
};

const rightStyle = {
  alignSelf: 'flex-end',
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
};

const iconStyle = {
  color: '#333',
  marginLeft: '10px',
};

const bottomStyle = {
  marginTop: '5px',
  fontSize: '12px',
  color: '#666',
};

export default Footer;
