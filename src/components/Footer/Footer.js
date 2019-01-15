import React from 'react';
import { Link } from 'react-router-dom';
import '../../VocaCoord.css';

const Footer = () => (
  <div className="footer">
    <Link to="/" className="link link--spacer">
      About Us
    </Link>
    <a
      className="link link--spacer"
      href="https://steamcommunity.com/id/MikeynJerry"
    >
      Contact Us
    </a>
    <Link to="/student" className="link link--spacer">
      Student
    </Link>
  </div>
);

export default Footer;
