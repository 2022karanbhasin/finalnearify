
import React, { useState, useEffect, isValidElement, useContext } from 'react';
import Spotify from 'spotify-web-api-js';
import { Grid, Image, Header, Search, Button, Container, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {InfoContext} from '../../App'
import SearchbarSongs from './SearchbarSongs';
const mongoose = require('mongoose');
const s = new Spotify();
const SeeFavSongs = () => {
        const { user, accesstoken} = React.useContext(InfoContext);

        // const { accesstoken, user } = useContext(InfoContext);
        const [songnames, setNames] = useState([]);
        const [songimages, setImages] = useState([]);
        const [orderedSongs, setOrderedSongs] = useState([]);
        var array = [...Array(user['favoritesongs'].length).keys()];
        const [indexarray, setIndex] = useState(array);
        console.log(accesstoken);
        s.setAccessToken(accesstoken);
        useEffect(initializeState, [user]);
        var temp = [];
        var temp2 = [];
        var temp3 = [];
        function initializeState() {
                console.log(user);
                if (user&&user['favoritesongs']) {
                        for (let i = 0; i < user['favoritesongs'].length; i++) {
                                //     console.log("This is songs",songs)
                                s.getTrack(user['favoritesongs'][i]).then(
                                        res => {
                                                temp.push(res.name);
                                                temp2.push(res.album.images[0].url);
                                                temp3.push(user['favoritesongs'][i]);
                                                //      console.log("Inside then")
                                                //      console.log(res);
                                                //      console.log(temp);
                                                if (temp.length == user['favoritesongs'].length) {
                                                        setNames(temp);
                                                        setImages(temp2);
                                                        setOrderedSongs(temp3);
                                                }

                                        }).catch(err => console.log(err));
                        }
                }

        }

        
        function returnSecondFavSong(id) {
                var songName = songnames[id];
                var imageurl = songimages[id];
                // console.log(indexarray);
                // console.log(artistimages)
                if (imageurl) {
                        //      console.log(imageurl);
                        return (
                                <Grid.Column key={id.toString()} mobile={16} tablet={8} computer={4} id={id}>
                                        {/* <Link to={`/track/${orderedSongs[id]}`} > */}
                                                <Image rounded src={imageurl} verticalAlign='middle' />
                                                <Header size='huge'>{songName}</Header>
                                        {/* </Link> */}
                                        <br></br>
                                </Grid.Column>);
                }
                else {
                        // console.log(imageurl)
                        return "null";
                }
        }
        
        

        //      console.log(artistnames)
        return (
                <div className="FavoriteArtists ">
                <Container>
                        <Divider hidden></Divider>
                        <Header  textAlign='center' size='huge'>Your Top Songs</Header>
                        <Header textAlign='center' style={{marginTop:"-15px"}} size='large'>Search To Add Songs</Header>

                        <SearchbarSongs />
                        <Divider></Divider>

                        <Grid>

                        

                        <Grid.Row>
                                {indexarray.map(id => returnSecondFavSong(id))}
                        </Grid.Row>

                        
                        </Grid>
                        </Container>
                </div>
        )
}

export default SeeFavSongs;