import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/App.css";

const YouTubeManager = () => {
  const [playlists, setPlaylists] = useState([]);
  const [videos, setVideos] = useState([]);

  const fetchPlaylists = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/get-playlists");
      setPlaylists(data);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  const fetchVideos = async (playlistId) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/get-videos/${playlistId}`);
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  return (
    <div className="youtube-manager">
      <button onClick={fetchPlaylists}>Import Playlists</button>
      <div className="playlist-section">
        {playlists.map((playlist) => (
          <div 
            key={playlist.id} 
            className="playlist-card" 
            onClick={() => fetchVideos(playlist.id)}
          >
            <img src={playlist.thumbnail} alt={playlist.title} />
            <p>{playlist.title}</p>
          </div>
        ))}
      </div>
      <div className="video-section">
        <h3>Videos</h3>
        {videos.map((video) => (
          <div key={video.id}>
            <img src={video.thumbnail} alt={video.title} />
            <p>{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeManager;
