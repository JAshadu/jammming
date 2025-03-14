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
          <SearchResults searchResults={searchResults} />
          <Playlist
          playlistTitle={playlistTitle}
          playlistTracks={playlistTracks}  />
        </div>
      </main>
    </div>
  );
}

export default App;
