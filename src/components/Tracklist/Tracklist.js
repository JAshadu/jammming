import React from "react";
import "./Tracklist.css"
import Track from "../Track/Track";

function Tracklist(props) {
    return (
      <div className="Tracklist">
        {props.tracks.map(track => {
          return(
            <Track
            key={track.id}
            name={track.name}
            artist={track.artist}
            album={track.album}
            addTrack={props.addTrack}
            removeTrack={props.removeTrack}
            track={track} />
          )
        })}
      </div>
    );
}

export default Tracklist;
