import {useEffect} from "react"

import {API} from "../api"

const Search = () => {
    console.log('Search')
    useEffect(() => {
        API.getMovies('one', true, '1')
    }, [])
    return (
        <div>Search</div>
    )
}

export default Search
