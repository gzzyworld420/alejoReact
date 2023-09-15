import React from 'react';
import './Header.css';

import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className='navbar'>
      <div className='logo-home'>
        <img
          className='logo'
          src='/img/logo.png' // Ruta relativa a la carpeta public
          alt='Logo'
          onClick={() => window.location.href = '/'}
        />
      </div>
      <div className="list-header">
        <Link to='/favoritos'>Favorite</Link>
        <Link to='/estrenos'>In Premiere</Link>
        <Link to='/populares'>Popular</Link>
      </div>
    </nav>
  );
}

export default Header;
