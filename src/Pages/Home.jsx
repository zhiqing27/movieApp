import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import Content from "../Shared/Content";
import './Home.css'
import PaginationElement from "../Shared/PaginationElement";
const Home = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const fetchMovies = async () => {
    const data = await axios.get(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );
    setMovies(data.data.results);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Movie list</span>
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
      <PaginationElement setPage={setPage} numOfPages="10"/>
    </div>
  );
}


export default Home;