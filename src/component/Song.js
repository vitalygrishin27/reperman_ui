import React, {Component} from "react";
import {Form, Image} from "react-bootstrap";
import axios from 'axios';
import ToastMessage from "./ToastMessage";
import {getEndpoint, getOptions, SONG_MAIN_ENDPOINT} from "./Welcome";


export default class Song extends Component {

    componentDidMount() {
        this.fetchRepertoire();
    }

    constructor(props) {
        super(props);
        this.state = {
            showToast: false,
            error: false,
            message: '',
            songList: [],
            song: {},
            activeImage: '',
        };
        this.changeSong = this.changeSong.bind(this);
        this.changeSongList = this.changeSongList.bind(this);
        this.changeSongId = this.changeSongId.bind(this);
        this.changeInstrument = this.changeInstrument.bind(this);
        this.getActiveImageOrDefault = this.getActiveImageOrDefault.bind(this);
    }

    changeSong(event) {
        this.props.changeSongId(event.target.value);
    }

    changeSongId(event) {
        if (event.target.value === -1) return;
        this.props.changeSongId(event.target.value);
        this.fetchSongById(event.target.value);
    }

    changeSongList(songList) {
        this.props.changeSongList(songList);
    }

    changeInstrument(event) {
        this.setState({
            instrument: event.target.value,
            activeImage: this.getActiveImageOrDefault(event.target.value)
        })
        this.props.changeInstrument(event.target.value);
    }

    setActiveSongOnServer = (songId) => {
        axios.put(getEndpoint(SONG_MAIN_ENDPOINT) + "/" + songId, getOptions())
            .catch((error) => {
                console.error("Error" + error);
                this.setState({
                    showToast: true,
                    error: true,
                    message: 'Set active song on server error'
                });
              //  setTimeout(() => this.setState({showToast: false}), 3000);
            });
    }

    getActiveImageOrDefault(instrument, newSongAfterFetch) {
        let result;
        let song;
        if (newSongAfterFetch) {
            song = newSongAfterFetch;
            result = "data:image/png;base64," + song.mainPicture;
        } else {
            song = this.state.song;
            result = "data:image/png;base64," + this.state.song.mainPicture;
        }
        console.log(song && song.parts && song.parts.length > 0)
        switch (instrument) {
            case 'PIANO':
                if (song && song.parts && song.parts.length > 0) {
                    song.parts.forEach(function callback(part) {
                        if (part.instrument === "PIANO") {
                            result = "data:image/png;base64," + part.picture;
                        }
                    })
                }
                break;
            case 'GUITAR':
                if (song && song.parts && song.parts.length > 0) {
                    song.parts.forEach(function callback(part) {
                        if (part.instrument === "GUITAR") {
                            result = "data:image/png;base64," + part.picture;
                        }
                    })
                }
                break;
            case 'BAS':
                if (song && song.parts && song.parts.length > 0) {
                    song.parts.forEach(function callback(part) {
                        if (part.instrument === "BAS") {
                            result = "data:image/png;base64," + part.picture;
                        }
                    })
                }
                break;
            case 'DRUMS':
                if (song && song.parts && song.parts.length > 0) {
                    song.parts.forEach(function callback(part) {
                        if (part.instrument === "DRUMS") {
                            result = "data:image/png;base64," + part.picture;
                        }
                    })
                }
                break;
            case 'RHYTHM_GUITAR':
                if (song && song.parts && song.parts.length > 0) {
                    song.parts.forEach(function callback(part) {
                        if (part.instrument === "RHYTHM_GUITAR") {
                            result = "data:image/png;base64," + part.picture;
                        }
                    })
                }
                break;
            case 'LYRICS':
                if (song && song.parts && song.parts.length > 0) {
                    song.parts.forEach(function callback(part) {
                        if (part.instrument === "LYRICS") {
                            result = "data:image/png;base64," + part.picture;
                        }
                    })
                }
                break;
            default:
                result = "data:image/png;base64," + song.mainPicture;
        }
        return result;
    }

    fetchSongById = (songId) => {
        axios.get(getEndpoint(SONG_MAIN_ENDPOINT) + "/" + songId, getOptions())
            .then(response => {
                this.props.changeSong(response.data);
                this.setState({
                    song: response.data,
                    activeImage: this.getActiveImageOrDefault(this.state.instrument, response.data)
                });
                this.setActiveSongOnServer(response.data.id);
            })
            .catch((error) => {
                console.error("Error" + error);
                this.setState({
                    showToast: true,
                    error: true,
                    message: 'Fetching error'
                });
             //   setTimeout(() => this.setState({showToast: false}), 3000);
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
                    showToast: true,
                    error: true,
                    message: 'Fetching error'
                });
              //  setTimeout(() => this.setState({showToast: false}), 3000);
            });
    }

    render() {
        const {songId, instrument} = this.props;
        const {songList, song, activeImage, showToast, error, message} = this.state;
        return (
            <div style={{"margin": 0}}>
                <div style={{"display": showToast ? "block" : "none"}}>
                    <ToastMessage
                        showToast={showToast}
                        error={error}
                        message={message}
                    />
                </div>
                <Form>
                    <div style={{"margin": 0}}>
                        <Form.Control
                            style={{"width": "100%", "fontSize": 32}}
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


                            <Image src={activeImage} width={"100%"}
                                   height={"100%"}/>


                    <div>
                        <Form.Control
                            style={{"width": "100%", "fontSize": 22}}
                            as="select"
                            onChange={this.changeInstrument}
                            id="inputInstrument"
                            aria-describedby="inputInstrumentHelpInline">
                            <option key={"Default"} value={"Default"}>
                                Default
                            </option>
                            <option key={"BAS"} value={"BAS"}>
                                BAS
                            </option>
                            <option key={"PIANO"} value={"PIANO"}>
                                PIANO
                            </option>
                            <option key={"DRUMS"} value={"DRUMS"}>
                                DRUMS
                            </option>
                            <option key={"RHYTHM_GUITAR"} value={"RHYTHM_GUITAR"}>
                                RHYTHM_GUITAR
                            </option>
                            <option key={"GUITAR"} value={"GUITAR"}>
                                GUITAR
                            </option>
                            <option key={"LYRICS"} value={"LYRICS"}>
                                LYRICS
                            </option>
                        </Form.Control>
                    </div>
                </Form>
            </div>
        );
    }
}



