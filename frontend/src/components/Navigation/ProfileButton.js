import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  const changeMenu = () => {
    // if (showMenu) return;
    setShowMenu(!showMenu);
  };
  
  // const closeMenu = () => {
    //   setShowMenu(false);
  // };


  // useEffect(() => {
  //   if (!showMenu) return;

  //   if(showMenu){
  //   document.addEventListener('click', closeMenu);
  //   return () => document.removeEventListener("click", closeMenu);
  //   }

  // }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button onClick={changeMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
