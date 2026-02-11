import React from "react";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults(props) {
    return (
      <div className="SearchResults">
        <Tracklist
        tracks={props.searchResults}
        addTrack={props.addTrack} />
      </div>
    );
}

export default SearchResults;
