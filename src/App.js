import React, { useEffect, useState } from 'react';
import Sidebar from './Components/sidebar/sidebar';
import Header from './Components/header/header';
import Main from './Components/main/main';
import Player from './Components/player/player';
import './App.css';
import axios from 'axios';

const App = () => {
  const CLIENT_ID = "26cfff6fd8134499b5a9cf5c3386018f";
  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE = "user-top-read user-library-read playlist-read-private"; // Include the scope for reading user's top tracks

  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find(elem => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);

    if (token) {
      axios
        .get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          setUser(response.data);
        })
        .catch(error => console.log(error));
    }
  }, []);

  const logout = () => {
    setToken("");
    setUser(null);
    window.localStorage.removeItem("token");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="app">
      {!token ? (
        <a
          className="login-button"
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
        >
          Login with Spotify
        </a>
      ) : (
        <>
          <Sidebar />
          <div className='main'>
            <Header user={user} logout={logout} onSearch={handleSearch} />
            <Main user={user} token={token} searchQuery={searchQuery} />
          </div>
          <Player />
        </>
      )}
    </div>
  );
};

export default App;
