import React, {Component} from "react";
import logo from "../FullHouse.PNG";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

export function getOptions() {
    return ({
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
    })
}

export function getEndpoint(type) {
    const host = localStorage.getItem("fullHouseHost");
    switch (type) {
        case SONG_MAIN_ENDPOINT:
            return host + "songs";
        default:
            return null;
    }
}

export const SONG_MAIN_ENDPOINT = 'SONG_MAIN_ENDPOINT';

export default class Welcome extends Component {
    componentDidMount() {
        //  localStorage.setItem("fullHouseHost", "http://localhost:1001/reperman/")
        localStorage.setItem("fullHouseHost", "https://reperman.herokuapp.com/reperman/")
    }

    render() {
        return (
            <div className="App" style={{"margin": 0}}>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <Button className="card-group"
                            style={{"background": "transparent", "fontSize": 30, "color": "white"}}>
                        <Link style={{"background": "transparent", "fontSize": 30, "color": "white"}} to={"/songs"}>
                            START
                        </Link>
                    </Button>
                </header>
            </div>
        );
    }
}