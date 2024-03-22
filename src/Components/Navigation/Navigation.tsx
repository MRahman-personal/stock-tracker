import { FC } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation:FC = () => {
  return (
    <nav className="navbar">
      <ul className="logo">
        <li>Smart Stock Tracker</li>
      </ul>
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Stocks</Link>
        </li>
        <li className="navbar-item">
          <Link to="/Favorites" className="navbar-link">Favorites</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
