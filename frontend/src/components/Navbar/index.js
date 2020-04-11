import React from 'react';
import { Link } from  'react-router-dom';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import LogoUrl from  '../../assets/logo-jshunt.svg';
import Navbar from './style';

export default () => (
  <Navbar>
    <Link to="/">
      <MdKeyboardArrowLeft/>
    </Link>
    <Link to="/">
      <img src={LogoUrl} alt="JSHUNT" />
    </Link>
  </Navbar>
);
