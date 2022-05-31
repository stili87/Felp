import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Navigation.css';
import * as sessionActions from '../../store/session';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink className='nav-link' to='/business/create'>Create Business</NavLink>
        <button id='nav-link-logout' onClick={(e)=>logout(e)}>Log Out</button>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className='nav-link' to='/'>Log In or Sign Up</NavLink>
      </>
    );
  }

  return (
    <nav id='nav-bar-wrapper'>
      <div id='nav-bar-left'>
        <NavLink id='nav-home-link' exact to="/">
        <img alt='icon' id='nav-icon' src='https://cdn.iconscout.com/icon/free/png-256/yelp-3771117-3147795.png'></img>
          Felp</NavLink>
      </div>
      <div id='nav-bar-right'>
      <NavLink className='nav-link' exact to="/listings">Businesses</NavLink>
        {isLoaded && sessionLinks}
      </div>
    </nav>
  );
}

export default Navigation;
