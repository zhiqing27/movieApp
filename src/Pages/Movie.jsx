import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Accordion, AccordionSummary, AccordionDetails, Typography, FormControl, MenuItem, Select } from "@material-ui/core";
import './Movie.css';
import Content from "../Shared/Content";
import PaginationElement from "../Shared/PaginationElement";
import { Icon } from '@iconify/react';
const minOffset = 0;
const maxOffset = 30;
const tyear = (new Date()).getFullYear();
const Movie = () => {
    let [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [data, setData] = useState([]);
    let [selected, setSelected] = useState([]);
    const [movies, setMovies] = useState([]);
    const [thisYear, selectedYear] = useState("");
    useEffect(() => {
        window.scroll(0, 0);
        getSelected("");
        // eslint-disable-next-line
    }, [page]);
    useEffect(() => {
        window.scroll(0, 0);
        fetchGenre();
    }, []);
    const options = [];
    options.push(<MenuItem value="">ALL</MenuItem>);
    for (let i = minOffset; i <= maxOffset; i++) {
        const year = tyear - i;
        options.push(<MenuItem value={year}>{year}</MenuItem>);
    }
    const fetchGenre = async () => {
        const data = await axios.get(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setData(data.data.genres);
        getList();
    };
    const onHandleChange = (evt) => {
        selectedYear(evt.target.value);
        getSelected(selected,evt.target.value);
    };
    function myFilter(elm){
        return (elm != null && elm !== false && elm !== "");
    }
    function getSelected(dt,yr) {
        var id;
        if (dt == "") {
            id = "";
        } else{
            id = dt.id
        }
        var byDate="";
        var url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&with_watch_monetization_types=flatrate&page=${page}`;
        if(typeof yr!="undefined"){
            if(yr!=""){
                byDate=`&primary_release_year=${yr}`
            }
        }else{
            if(thisYear!=""){
                byDate=`&primary_release_year=${thisYear}`
            }
        }
      let y=[];
        if(id!=""|| typeof id!="undefined"){
            if (selected.findIndex((x) => x === id) == -1) {
                setSelected(selected => [...selected, id]);
                y=selected;
                y.push(id);
            } else {
                var array = [...selected];
                 // make a separate copy of the array
                var index = array.indexOf(id)
                if (index !== -1) {
                    array.splice(index, 1);
                    setSelected(array)
                }
                y=array;
            }
        }
        var arr = y.filter(myFilter);   
        if (arr.length > 0) {
            let text = arr.join();
            url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&with_genres=${text}&page=${page}${byDate}`;
        } else {
            url = `${url}${byDate}`
        }
        getList(url);
    }
   
    async function getList(url) {

        if (typeof url == "undefined") {
             url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=${page}`;
        }
        const data = await axios.get(
            url
        );
        setMovies(data.data.results);
        if (url != `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=${page}`) {
            setTotalPage(data.data.total_pages);
        } else {
            setTotalPage(10);
        }
   }
    return (
        <div>
            <span className="pageTitle">Genres</span>
            {data && data.map((dt, index) => (
                selected.findIndex((x) => x == dt.id) == -1 ? <Button variant="contained" onClick={() => {
                    getSelected(dt)
                }} key={index} color="default">{dt.name}</Button> : <Button variant="contained" onClick={() => {
                    getSelected(dt)
                }} key={index} color="primary">{dt.name}</Button>
            ))}
            <br></br>
            <br></br>
            <Accordion>
                <AccordionSummary
                    expandIcon={<Icon icon="mdi-light:chevron-down" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Filter By Year</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={thisYear}
                            onChange={onHandleChange}
                        >
                            {options}
                        </Select>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
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
            </div>
            <PaginationElement setPage={setPage} numOfPages={totalPage} />
        </div>
    )
}
export default Movie;