import { Badge, DialogTitle, Dialog, DialogContent, Box, DialogActions, Button, Grid } from "@material-ui/core";
import { Icon } from '@iconify/react';
const unavailableLandscape =
    "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg";
import React from "react";
const img_300 = "https://image.tmdb.org/t/p/w300";
const img_500 = "https://image.tmdb.org/t/p/w500";
const unavailable =
    "https://www.movienewz.com/img/films/poster-holder.jpg";
import "../Shared/Content.css";
import { useState } from "react";
import axios from "axios";
const Content = ({
    id,
    poster,
    title,
    date,
    media_type,
    vote_average,
    vote
}) => {
    const [id1, setId] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = useState();
    const [video, setVideo] = useState();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function getMovie(id, media_type) {
        if (typeof media_type == "undefined") {
            media_type = "movie";
        }
        setId(id);
        handleClickOpen();
        getDetails(id, media_type)
    }
    async function getDetails(id, media_type) {
        var dt = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        if (dt) {
            if (typeof dt.data != "undefined") {
                (dt.data)
                setContent(dt.data);
            }
        }
        var dt1 = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        if (dt1) {
            if (typeof dt.data != "undefined") {
                if (dt1.data.results.length > 0) {
                    setVideo(`https://www.youtube.com/embed/${dt1.data.results[0]?.key}`);
                } else {
                    setVideo("");
                }
            } else {
                setVideo("");
            }
        } else {
            setVideo("");
        }
    }
    function directMovie(video) {
        window.open(video, '_blank');
    }
    return (
        <>
            <Grid item xs={6} md>
                <div>
                    <div onClick={() => {
                        getMovie(id, media_type)
                    }}
                        className="media"
                        style={{ cursor: "pointer" }}
                        color="inherit">
                        <Badge badgeContent={vote_average} color={vote_average >= 7 ? 'primary' : 'error'} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}></Badge>
                        <img className="poster" src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
                        <b className="title">{title}</b>
                        <span className="subTitle">
                            {media_type === "tv" ? "TV Series" : "Movie"}
                            <span className="subTitle">{date}</span>
                        </span>
                        <span className="subTitle">
                            <Icon icon="mdi:fire" style={{ color: 'red' }} />
                            <span className="subTitle">{vote} votes</span>
                        </span>
                    </div>
                </div>
            </Grid>
            <Dialog
                fullWidth={true}
                maxWidth="md"
                open={open}
                scroll="paper"
                onClose={handleClose}
                PaperProps={{
                    style: {
                        backgroundColor: "black",
                        boxShadow: "none",
                        color: "white",
                        overflow: "auto"
                    },
                }}
            >
                <DialogTitle>Details</DialogTitle>
                <DialogContent>
                    <Box
                        noValidate
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            width: 'fit-content',
                        }}
                    >
                        {
                            content ? <div className="ContentModal">
                                <img
                                    src={
                                        content.poster_path
                                            ? `${img_500}/${content.poster_path}`
                                            : unavailable
                                    }
                                    alt={content.name || content.title}
                                    className="ContentModal_portrait"
                                />
                                <img
                                    src={
                                        content.backdrop_path
                                            ? `${img_500}/${content.backdrop_path}`
                                            : unavailableLandscape
                                    }
                                    alt={content.name || content.title}
                                    className="ContentModal_landscape"
                                />
                                <div className="ContentModal_about">
                                    <span className="ContentModal_title">
                                        {content.name || content.title}(
                                        {(
                                            content.first_air_date ||
                                            content.release_date ||
                                            "----"
                                        ).substring(0, 4)}
                                        )
                                    </span>

                                    {content.tagline && (
                                        <i className="tagline">{content.tagline}</i>
                                    )}

                                    <span className="ContentModal_description">
                                        {content.overview}
                                    </span>
                                    <span className="ContentModal_description">
                                        {
                                            video == "" ? <></> : <Button variant="contained" color="primary" style={{ color: "white", fontSize: '18px' }} onClick={() => { directMovie(video) }}><Icon icon="bxs:camera-movie" />  Watch teaser</Button>
                                        }

                                    </span>
                                </div>
                            </div> : <div></div>
                        }
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose} >Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default Content;