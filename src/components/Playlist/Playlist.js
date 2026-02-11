import React from "react";
import Tracklist from "../Tracklist/Tracklist";

function Playlist(props) {
    return (
        <div>
            <input value={props.playlistTitle} onChange={(e) => props.titleChange(e.target.value)}/>
            <Tracklist 
            tracks={props.playlistTracks}
            removeTrack={props.removeTrack} />
            <button>Save To Spotify</button>
        </div>
    )
}

export default Playlist;
