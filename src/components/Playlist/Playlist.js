import React from "react";
import Tracklist from "../Tracklist/Tracklist";

function Playlist(props) {
    return (
        <div>
            <input value={props.playlistTitle} placeholder="New Playlist" onChange={(e) => props.titleChange(e.target.value)}/>
            <Tracklist 
            tracks={props.playlistTracks}
            removeTrack={props.removeTrack} />
            <button onClick={props.savePlaylist}>Save To Spotify</button>
        </div>
    )
}

export default Playlist;
