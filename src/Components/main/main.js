import React, { useEffect, useState } from 'react';
import './main.css';
import axios from 'axios';

const Main = ({ user, token, searchQuery }) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        if (searchQuery) {
          const searchResponse = await axios.get('https://api.spotify.com/v1/search', {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              q: searchQuery,
              type: 'track',
              limit: 20,
            },
          });

          setTracks(searchResponse.data.tracks.items);
        } else {
          const topTracksResponse = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
            headers: { Authorization: `Bearer ${token}` },
          });

          const trackIds = topTracksResponse.data.items.slice(0, 5).map(track => track.id).join(',');

          const recommendationsResponse = await axios.get(`https://api.spotify.com/v1/recommendations?seed_tracks=${trackIds}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setTracks(recommendationsResponse.data.tracks);
        }
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    };

    if (token) fetchTracks();
  }, [token, searchQuery]);

  return (
    <div className="main-content">
      <h1>Good afternoon, {user?.display_name}</h1>
      <div className="recommendations-grid">
        {tracks.map((track) => (
          <div className="track-card" key={track.id}>
            <img src={track.album.images[0].url} alt={track.name} />
            <div className="track-info">
              <h3>{track.name}</h3>
              <p>{track.artists.map(artist => artist.name).join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
