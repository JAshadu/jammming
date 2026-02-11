import './App.css';
import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from '../Playlist/Playlist';
import exampleTracks from '../exampleTracks';

function App() {
  const [searchResults, setSearchResults] = useState(exampleTracks)
  const [playlistTitle, setPlaylistTitle] = useState("New Playlist")
  const [playlistTracks, setPlaylistTracks] = useState([])

  function addTrack(track) {
    if(playlistTracks.find(currentTrack => currentTrack.id === track.id)) {
      return;
    }
    else {
      setPlaylistTracks(prev => [...prev, track])
    }
  }

  function removeTrack(track) {
    setPlaylistTracks(prev => {
      return prev.filter(currentTrack => currentTrack.id !== track.id)
    })
  }

  function updatePlaylistTitle(title) {
    setPlaylistTitle(title)
  }

  return (
    <div>
      <header>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
      </header>
      <main>
        <SearchBar />
        <div className='library'>
          <SearchResults
          searchResults={searchResults}
          addTrack={addTrack} />
          <Playlist
          playlistTitle={playlistTitle}
          playlistTracks={playlistTracks}
          removeTrack={removeTrack}
          titleChange={updatePlaylistTitle}  />
        </div>
      </main>
    </div>
  );
}

export default App;
