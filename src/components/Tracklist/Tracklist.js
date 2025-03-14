import React from "react";
import Track from "../Track/Track";

function Tracklist(props) {
    return (
      <div className="TrackList">
        {props.tracks.map(track => {
          return(
            <Track
            key={track.id}
            name={track.name}
            artist={track.artist}
            album={track.album} />
          )
        })}
      </div>
    );
}

export default Tracklist;
