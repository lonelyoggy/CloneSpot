import React, { useEffect, useState } from 'react';
import './main.css';
import axios from 'axios';

const Main = ({ user, token }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Fetch the user's top tracks
        const topTracksResponse = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const topTracks = topTracksResponse.data.items;
        

        // Get track IDs
        const trackIds = topTracks.slice(0, 5).map(track => track.id).join(',');
        console.log('Track IDs for recommendations:', trackIds);

        // Fetch recommendations based on top tracks
        const recommendationsResponse = await axios.get(`https://api.spotify.com/v1/recommendations?seed_tracks=${trackIds}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('Fetched recommendations:', recommendationsResponse.data.tracks);
        setRecommendations(recommendationsResponse.data.tracks);
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      fetchRecommendations();
    }
  }, [token]);

  return (
    <div className="content">
      <h2>Good Afternoon{user ? `, ${user.display_name}` : ''}</h2>
      <div className="card-container">
        {recommendations.length > 0 ? (
          recommendations.map((track) => (
            <div className="card" key={track.id}>
              <img src={track.album.images[0].url} alt={track.name} />
              <p>{track.name}</p>
              <p>{track.artists.map(artist => artist.name).join(', ')}</p>
            </div>
          ))
        ) : (
          <p>No recommendations found</p> // Add a message if no recommendations are found
        )}
      </div>
    </div>
  );
};

export default Main;
