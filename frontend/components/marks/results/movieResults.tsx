import React, { useState, useEffect } from 'react';
import axios from 'axios';



const MovieResults = ({ keyword }) => {
    const [searchResult, setSearchResult] = useState([]);
    const [searchLoader, setSearchLoader] = useState(false);
    const [searchError, setSearchError] = useState(null);

    const handleSearch = async () => {
        setSearchLoader(true);
        setSearchResult([]);

        try {
            const options = {
                method: 'GET',
                url: `https://api.themoviedb.org/3/search/${keyword}?include_adult=false&language=en-US&page=1`,
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzIwN2U0MTZlM2Y0MGVjZGI4YWI1ZWE1NDkwZjgwMiIsInN1YiI6IjY0MmMwZTRiOGRlMGFlMDBiNjU2NGM4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7QuoAI7yYYWB3X2wlwnr4x-OgiTnt_O1ajXtCZb-ZKk'
                }
            };
            const response = await axios.request(options);
            setSearchResult(response.data);
        } catch (error) {
            setSearchError(error);
            console.log(error);
        } finally {
            setSearchLoader(false);
        }

    }


    useEffect(() => {
        handleSearch();
        console.log(searchResult['results'] === undefined)
    }, [keyword])

    return (
        <>
            {searchResult['results'] === undefined
                ? <p>no results</p>
                : searchResult['results'][0]
                    ? <p>{searchResult['results'][0]['title']}</p>
                    : <p></p>
            }
        </>
    )

}

export default MovieResults;