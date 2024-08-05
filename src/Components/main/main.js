// Main.js
import React, { useEffect, useState } from 'react';
import './main.css';
import axios from 'axios';

const Main = ({ user, token }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const topTracksResponse = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const trackIds = topTracksResponse.data.items.slice(0, 5).map(track => track.id).join(',');

        const recommendationsResponse = await axios.get(`https://api.spotify.com/v1/recommendations?seed_tracks=${trackIds}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setRecommendations(recommendationsResponse.data.tracks);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    if (token) fetchRecommendations();
  }, [token]);

  return (
    <div className="main-content">
      <h1>Good afternoon, {user?.display_name}</h1>
      <div className="recommendations-grid">
        {recommendations.map((track) => (
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