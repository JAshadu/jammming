import './App.css';
import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from '../Playlist/Playlist';
import requestUserAuth from '../../assets/Spotify';

function App() {
  const [searchResults, setSearchResults] = useState([])
  const [playlistTitle, setPlaylistTitle] = useState("")
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

  const savePlaylist = async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      requestUserAuth();
      return;
    }

    if (!playlistTitle || playlistTracks.length === 0) {
      return;
    }

    const trackUris = playlistTracks.map(track => track.uri);

    const userResponse = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });

    const userData = await userResponse.json();
    const userID = userData.id;
    
    try{
      const createPlaylist = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: playlistTitle,
          public: false,
          description: ""
        })
      })

      const playlistData = await createPlaylist.json();
      const playlistId = playlistData.id;

      await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            uris: trackUris
          })
        }
      );
      
      alert(`"${playlistTitle}" has been added to your Spotify library successfully`)
      setPlaylistTitle("")
      setPlaylistTracks([])
    }
    catch(error) {
      console.log(error)
    }
  }

  function spotifyToken() {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');

    if (!code) return;

    const clientId = process.env.REACT_APP_CLIENT_ID;
    const redirectUri = "https://jaa-jammming.netlify.app/";
    /*const redirectUri = "http://127.0.0.1:3000"; (for testing)*/


    const getToken = async code => {

      // stored in the previous step
      const codeVerifier = localStorage.getItem('code_verifier');

      const url = "https://accounts.spotify.com/api/token";
      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: clientId,
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier,
        }),
      }

      const body = await fetch(url, payload);
      const response = await body.json();

      if (response.access_token) {
        localStorage.setItem('access_token', response.access_token);
        window.history.replaceState({}, document.title, "/");
      } else {
        console.error("Token exchange failed:", response);
      }
    }

    if(code){
      getToken(code)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const code = new URLSearchParams(window.location.search).get('code');

    if (!token && !code) {
      requestUserAuth();
    }
    else if (code) {
      spotifyToken();
    }
  }, []);

  const search = async (input) => {
    let accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      requestUserAuth();
      return;
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(input)}&type=track`,
        {
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        }
      );

      if (response.ok) {
        const jsonResponse = await response.json();

        const tracks = jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));

        setSearchResults(tracks);
      } else {
        console.log("Search failed:", response.status);
      }
    } catch (errors) {
      console.log(errors);
    }
  };
    
  return (
    <div>
      <header>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
      </header>
      <main>
        <SearchBar
        search={search} />
        <div className='library'>
          <SearchResults
          searchResults={searchResults}
          addTrack={addTrack} />
          <Playlist
          playlistTitle={playlistTitle}
          playlistTracks={playlistTracks}
          removeTrack={removeTrack}
          titleChange={updatePlaylistTitle}
          savePlaylist={savePlaylist}  />
        </div>
      </main>
    </div>
  );
}

export default App;
