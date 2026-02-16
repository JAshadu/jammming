import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import "./SearchResults.css"

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
