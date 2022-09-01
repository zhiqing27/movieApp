import { Badge,Grid } from "@material-ui/core";
import { Icon } from '@iconify/react';
import React from "react";
const img_300 = "https://image.tmdb.org/t/p/w300";
const img_500 = "https://image.tmdb.org/t/p/w500";
const unavailable =
    "https://www.movienewz.com/img/films/poster-holder.jpg";
import "../Shared/Content.css";
import { useState } from "react";
import axios from "axios";

const Actor = ({
    id,
    known_for_department,
    profile_path,
    name,
}) => {
    function getMovieACT(id, name) {
        window.open(`/movies/${id}/${name}`, '_blank');
    }
    return (
        <>
            <Grid item xs={6} md>
                <div>
                    <div onClick={() => {
                        getMovieACT(id, name)
                    }}
                        className="media"
                        style={{ cursor: "pointer" }}
                        color="inherit">
                        <img className="poster" src={profile_path ? `${img_300}/${profile_path}` : unavailable} alt={name} />
                        <b className="title">{name}</b>
                        <span className="subTitle">
                            <span className="subTitle">{known_for_department}</span>
                        </span>
                    </div>
                </div>
            </Grid>
        </>
    )
};

export default Actor;