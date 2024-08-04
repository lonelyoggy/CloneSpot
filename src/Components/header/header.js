import React from 'react';
import './header.css';
import { FaRegUser } from "react-icons/fa";


const Header = ({ user, logout }) => {
  return (
    <header>
      <input type="text" placeholder="Search for Artists, Songs, or Podcasts" />
      <div className="user-profile">
        {user ? (
          <>
            {user.images && user.images.length > 0 ? (
              <img 
                src={user.images[0].url}  // Use user's profile image if available
                alt="User" 
              />
            ) : (
              <FaRegUser size={30} /> // Use CiUser icon if user's profile image is not available
            )}
            <span>{user.display_name}</span>
            <button className="logout-button" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <FaRegUser size={30} />
            <span>User</span>
            <button className="logout-button" onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
