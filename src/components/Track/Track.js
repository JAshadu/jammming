import React from "react";

function Track(props) {
    return (
      <div className="Track">
        <div className="TrackInfo">
          <h3>{props.name}</h3>
          <h4>{props.artist} | {props.album}</h4>
        </div>
        <button>+</button>
        <button>-</button>
      </div>
    );
}

export default Track;
