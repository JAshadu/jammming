import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import "./Playlist.css"

function Playlist(props) {
    return (
        <div className="playlist">
            <input value={props.playlistTitle} placeholder="New Playlist" onChange={(e) => props.titleChange(e.target.value)}/>
            <Tracklist 
            tracks={props.playlistTracks}
            removeTrack={props.removeTrack} />
            <button className="saveButton" onClick={props.savePlaylist}>Save To Spotify</button>
        </div>
    )
}

export default Playlist;
