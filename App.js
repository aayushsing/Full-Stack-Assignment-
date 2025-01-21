import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import YouTubeManager from "./components/YouTubeManager";
import LayoutManager from "./components/LayoutManager";
import "./styles/App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState("youtubeManager"); // 'youtubeManager' or 'layoutManager'

  // Handle user login
  const handleLogin = (token) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <div>
          <header className="header">
            <h1>YouTube Playlist & Layout Manager</h1>
            <div className="nav-buttons">
              <button onClick={() => setView("youtubeManager")}>YouTube Manager</button>
              <button onClick={() => setView("layoutManager")}>Layout Manager</button>
              <button
                onClick={() => {
                  localStorage.removeItem("authToken");
                  setIsAuthenticated(false);
                }}
              >
                Logout
              </button>
            </div>
          </header>
          <main>
            {view === "youtubeManager" && <YouTubeManager />}
            {view === "layoutManager" && <LayoutManager />}
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
