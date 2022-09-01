import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@material-ui/core";
import './App.css';
import Movie from "./Pages/Movie";
import Search from "./Pages/Search";
import People from "./Pages/People";
import { Icon } from '@iconify/react';
export default function App() {
  return (
    <>
      <div className="app">
        <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
    <a className="navbar-brand" href="#"><Icon icon="ic:baseline-movie-filter" /></a>
    <div className="d-flex">
      <button className="btn btn-primary" onClick={() => {
                 location.replace("/")
                }} type="button">Search</button>&nbsp;&nbsp;&nbsp;
      <button className="btn btn-primary" onClick={() => {
                 location.replace("/movies")
                }}   type="button">Genre</button>
    </div>
  </div>
        </nav>
        <Container>
          <BrowserRouter>
            <Routes >
              <Route path="/" element={<Search />} />
              <Route path="/movies" element={<Movie />} />
              <Route path="/movies/:id/:name" element={<People />} />
            </Routes >
          </BrowserRouter>
        </Container>
      </div>
    </>
  );
}