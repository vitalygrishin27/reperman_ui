import React, {Component} from "react";
import {Button, Col, Form, FormLabel, Image} from "react-bootstrap";
import axios from 'axios';
import ToastMessage from "./ToastMessage";
import {getEndpoint, getOptions, SONG_MAIN_ENDPOINT} from "./Welcome";


export default class Song extends Component {

    componentDidMount() {
        localStorage.setItem("host", "http://localhost:1001/");
        this.fetchRepertoire();
    }


    constructor(props) {
        super(props);
        this.state = {
            showToast: false,
            error: false,
            message: '',
            songList: [],
            song: {}
        };
        this.changeSong = this.changeSong.bind(this);
        this.changeSongList = this.changeSongList.bind(this);
        this.changeSongId = this.changeSongId.bind(this);
        this.changeInstrument = this.changeInstrument.bind(this);
    }

    changeSong(event) {
        this.props.changeSongId(event.target.value);
    }

    changeSongId(event) {
        if(event.target.value === -1) return;
        this.props.changeSongId(event.target.value);
        this.fetchSongById(event.target.value);
    }

    changeSongList(songList) {
        this.props.changeSongList(songList);
    }

    changeInstrument(instrument) {
        this.props.changeInstrument(instrument);
    }

    fetchSongById = (songId) => {
        axios.get(getEndpoint(SONG_MAIN_ENDPOINT) + "/" + songId, getOptions())
            .then(response => {
                this.props.changeSong(response.data);
                this.setState({song: response.data})
            })
            .catch((error) => {
                console.error("Error" + error);
                this.setState({
                    show: true,
                    error: true,
                    message: 'Fetching error'
                });
                setTimeout(() => this.setState({"show": false}), 3000);
            });
    }

    fetchRepertoire = () => {
        axios.get(getEndpoint(SONG_MAIN_ENDPOINT), getOptions())
            .then(response => {
                this.setState({songList: response.data})
                this.props.changeSongList(response.data);
            })
            .catch((error) => {
                console.error("Error" + error);
                this.setState({
                    show: true,
                    error: true,
                    message: 'Fetching error'
                });
                setTimeout(() => this.setState({"show": false}), 3000);
            });
    }

    render() {
        const {songId, instrument} = this.props;
        const {songList, song, showToast, error, message} = this.state;
        return (
            <div style={{"width":"800px", "height":"1280px"}}>
                <div style={{"display": showToast ? "block" : "none"}}>
                    <ToastMessage
                        showToast={showToast}
                        error={error}
                        message={message}
                    />
                </div>
                <Form>
                    <div>
                        <Form.Control
                            style={{"width":"100%", "fontSize":32}}
                            as="select"
                            onChange={this.changeSongId}
                            id="inputSong"
                            aria-describedby="inputSongHelpInline">
                            <option key={-1} value={-1}>
                                Select song
                            </option>
                            {songList.map((song, count) => (
                                <option key={count} value={song.id}>
                                    {song.name}
                                </option>
                            ))}
                        </Form.Control>
                    </div>
                    <div>
                        <FormLabel key={song.id}>
                            <Image src={"data:image/png;base64," + song.mainPicture} width={"100%"}
                                   height={"100%"}/>
                        </FormLabel>
                    </div>
                </Form>
            </div>
        );
    }
}



