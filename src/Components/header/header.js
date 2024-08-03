import React from "react";
import './header.css';

const Header = ({ user, logout}) => {
    return (
        <header>
            <input type="text" placeholder="Search for Artists, Songs, or Podcasts"/>
            <div className="user-profile">
                {user && (
                    <>
                        <img src={user.images[0]?.url} alt="User"/>
                        <span>{user.display_name}</span>
                        <button className="logout-button" onClick={logout}>Logout</button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;