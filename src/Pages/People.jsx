import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import Content from "../Shared/Content";
import './Home.css'
import PaginationElement from "../Shared/PaginationElement";
import {  useParams } from 'react-router-dom';
const People = () => {
    let { id, name } = useParams();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const fetchMovies = async () => {
    const data = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&with_people=${id}&page=${page}&include_adult=false`
    );
    setMovies(data.data.results);
    setTotalPage(data.data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Movie by {name}</span>
      <div className="trending">
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
              overview={movie.overview}
            />
          ))}
      </div>
      <PaginationElement setPage={setPage} numOfPages={totalPage}/>
    </div>
  );
}


export default People;