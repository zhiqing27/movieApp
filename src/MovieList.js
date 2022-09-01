import React from 'react';
import { Col } from "reactstrap";
const MovieList = (props) => {
    return (
        <>
            {props.movies.map((movie, index) => (
                <Col xs="4">
                    <div classNameName='image-container d-flex justify-content-start m-3' key={index}>
                        <img src={movie.Poster} alt='movie'></img>
                    </div>
                </Col>

            ))}
        </>
    );
};

export default MovieList;