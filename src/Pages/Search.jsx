import { Button, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import { MuiThemeProvider } from "@material-ui/core/styles";
import './Search.css';
import axios from "axios";
import './Movie.css';
import Content from "../Shared/Content";
import PaginationElement from "../Shared/PaginationElement";
import { createTheme } from "@material-ui/core/styles";
import Actor from "../Shared/Actor";
const theme = createTheme({
    overrides: {
        MuiOutlinedInput: {
            root: {
                "&:hover $notchedOutline": {
                    borderColor: "white"
                },
                "&$focused $notchedOutline": {
                    borderColor: "white"
                }
            },
            notchedOutline: {
                borderColor: "white"
            }
        }, MuiInputLabel: {
            root: {
                color: "white"
            },
        },
    }
});

const Search = () => {
    var [searchText, setSearchText] = useState("");
    var [searchBy, setSearchBy] = useState("movie");
    var [page, setPage] = useState(1);
    var [totalPage, setTotalPage] = useState(1);
    let [movies, setMovies] = useState([]);
    const [actMovie, setActMovie] = useState([]);
    const handleKeyDown = (event) => {
        // For searching on pressing 'ENTER' key.
        if (event.key === "Enter") {
            fetchSearch();
        }
    };
    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
        // eslint-disable-next-line
      }, [page]);
      useEffect(() => {
        window.scroll(0, 0);
        setSearchText("");
      }, [searchBy]);
    const fetchSearch = async () => {
        var url = "";
        var allMovie = [];
        var totalPg = 0;
        if(searchText!=""){
            if (searchBy == "movie") {
                setActMovie([]);
                url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
                const data = await axios.get(
                    url
                );
                allMovie = data.data.results;
                totalPg = data.data.total_pages;
                if(allMovie.length==0){
                    alert("No result found")
                }else{
                    setMovies(allMovie);
                    setTotalPage(totalPg);
                }
            } else {
                setMovies([])
                var url1 = `https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_API_KEY}&query=${searchText}`;
                let actor = await axios.get(
                    url1
                );
                var act=[];
                for(var i=0; i< actor.data.results.length; i++){
                    act.push(actor.data.results[i]);
                }
                if(act.length==0){
                    alert("No result return")
                }
                setActMovie(act)
                setTotalPage(act.length);
            }  
        }
    }
    function getSelected(type) {
        setSearchText("");
        setSearchBy(type);
        setMovies([]);
        setActMovie([]);
    }

    return (
        <div>
            <div className="searchSc">
                <span style={{ color: "white" }}>BY</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="contained" color={searchBy == "movie" ? "primary" : "default"} onClick={() => { getSelected("movie") }}>Movie</Button>&nbsp;&nbsp;
                <Button variant="contained" color={searchBy == "actor" ? "primary" : "default"} onClick={() => { getSelected("actor") }}>Actor</Button>
            </div>
            <div className="search">
                <MuiThemeProvider theme={theme}>
                    <TextField
                        value={searchText}
                        inputProps={{ style: { color: "white" } }}
                        style={{ flex: 1 }}
                        label="Search"
                        type="search"
                        variant="outlined"
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={handleKeyDown}

                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        style={{ marginLeft: 5 , fontSize:'20px'}}
                        onClick={fetchSearch}
                    >
                        <Icon icon="bx:search-alt" />
                    </Button>
                </MuiThemeProvider>
            </div>
            <div className="genres">
                {movies &&
                    movies.map((movie) => (
                        <Content
                            key={movie.id}
                            id={movie.id}
                            poster={movie.poster_path}
                            title={movie.title || movie.name}
                            date={movie.first_air_date || movie.release_date}
                            media_type={movie.media_type}
                            vote_average={movie.vote_average}
                            vote={movie.vote_count}
                        />
                    ))}
                       {actMovie &&
                    actMovie.map((act) => (
                        <Actor
                            key={act.id}
                            id={act.id}
                            known_for_department={act.known_for_department}
                            profile_path={act.profile_path}
                            name={act.name}
                        />
                    ))}   
            </div>
            {
                movies.length > 0 ? <PaginationElement setPage={setPage} numOfPages={totalPage} /> : <></>
            }
        </div>

    )
}
export default Search;