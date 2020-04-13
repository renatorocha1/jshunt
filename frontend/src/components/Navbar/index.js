import React from 'react';
import { Link } from  'react-router-dom';
import LogoUrl from  '../../assets/logo-jshunt.svg';
import Navbar from './style';

export default () => (
  <Navbar>
    <Link to="/">
      <img src={LogoUrl} alt="JSHUNT" />
    </Link>
  </Navbar>
);
