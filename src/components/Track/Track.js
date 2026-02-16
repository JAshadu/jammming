import React from "react";

function Track(props) {
  return (
    <div className="Track">
      <div className="TrackInfo">
        <h3>{props.name}</h3>
        <h4>{props.artist} | {props.album}</h4>
      </div>
      {props.addTrack && (
        <button onClick={() => props.addTrack(props.track)}>+</button>
      )}
      {props.removeTrack && (
        <button onClick={() => props.removeTrack(props.track)}>-</button>
      )}
    </div>
  );
}

export default Track;
