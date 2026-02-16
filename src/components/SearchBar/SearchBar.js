import React, { useState } from "react";
import "./SearchBar.css"

function SearchBar(props) {
    const [searchValue, setSearchValue] = useState('')

    return (
        <div className="searchDiv">
            <input className="searchBar" placeholder="Enter Song" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}></input>
            <button className="searchButton" onClick={() => props.search(searchValue)}>Search</button>
        </div>
    )
}

export default SearchBar;
