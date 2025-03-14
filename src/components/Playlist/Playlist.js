import React from "react";
import Tracklist from "../Tracklist/Tracklist";

function Playlist(props) {
    return (
        <div>
            <input value={props.playlistTitle}/>
            <Tracklist 
            tracks={props.playlistTracks} />
            <button>Save To Spotify</button>
        </div>
    )
}

export default Playlist;
