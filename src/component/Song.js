import React, {Component} from "react";
import {Button, Form, Image} from "react-bootstrap";
import axios from 'axios';
import ToastMessage from "./ToastMessage";
import {getEndpoint, getOptions, SONG_MAIN_ENDPOINT} from "./Welcome";
import logo from "../Loading.png";
import bipWav from "../bip.wav";
import {Link} from "react-router-dom";
import Metronome from "./Metronome";

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
            needCheckSong: true,
            temp: 100,
            needMetronome: false,
        };
        this.changeSong = this.changeSong.bind(this);
        this.changeSongList = this.changeSongList.bind(this);
        this.changeSongId = this.changeSongId.bind(this);
        this.changeInstrument = this.changeInstrument.bind(this);
        this.getActiveImageOrDefault = this.getActiveImageOrDefault.bind(this);
        this.closeToast = this.closeToast.bind(this);
    }

    changeSong(event) {
        this.props.changeSongId(event.target.value);
    }

    changeSongId(event) {
        if (event.target.value == -1) return;
        this.props.changeSongId(event.target.value);
        this.setActiveSongOnServer(event.target.value);
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

    updateMetronome = (instrument, temp) => {
        console.log("NEW Temp for metronome is" + temp);
        if (instrument == 'DRUMS') {
            this.setState({
                needMetronome: true,
                temp:temp,
            });
        }else{
            this.setState({
                needMetronome: false,
                temp:temp,
            });
        }
    }

    setActiveSongOnServer = (songId) => {
        console.log("set active song with id=" + songId)
        axios.put(getEndpoint(SONG_MAIN_ENDPOINT) + "/" + songId, getOptions())
            .then(response => {
                console.log("setting nwe song is successful")
            })
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
        this.updateMetronome(instrument, song.temp);
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

    checkActiveSongOnServer = () => {
        if (this.state.needCheckSong) {
          //  console.log("Check active song on server");
            this.setState({needCheckSong: false});
        } else {
        //    console.log("Waiting previous result of check");
            return;
        }
        axios.get(getEndpoint(SONG_MAIN_ENDPOINT) + "/activeId", getOptions())
            .then(response => {
                if (this.state.song.id !== response.data) {
             //       console.log("CheckActiveSongOnServer. old song=" + this.state.song.id + " on server song=" + response.data)
                    this.changeSelectBox(response.data);
                    this.fetchSongById(response.data);
                } else {
             //       console.log("CheckActiveSongOnServer. SAME song=" + this.state.song.id + " on server song=" + response.data)
                }
                this.setState({needCheckSong: true});
            })
            .catch((error) => {
                console.error("Error" + error);
                this.setState({
                    showToast: true,
                    error: true,
                    message: 'Fetching active song error'
                });
                this.setState({needCheckSong: true});
                //   setTimeout(() => this.setState({showToast: false}), 3000);
            });
    }

    changeSelectBox = (optionId) => {
        document.getElementById(optionId).selected = true;
    }
    fetchRepertoire = () => {
        axios.get(getEndpoint(SONG_MAIN_ENDPOINT), getOptions())
            .then(response => {
                this.setState({songList: response.data})
                this.props.changeSongList(response.data);
                if (this.state.intervalID) {
                    clearInterval(this.state.intervalID);
                }
                const intervalID = setInterval(this.checkActiveSongOnServer, 3000);
                this.setState({intervalID: intervalID})
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

    closeToast = () => {
        this.setState({showToast: false})
    }

    render() {
        //   const {songId, instrument} = this.props;
        const {songList, activeImage, showToast, error, message, needMetronome, temp} = this.state;
        return (
            <div style={{"margin": 0}} className="Song">
                <Metronome play={needMetronome} temp={temp}/>
                <div style={{"display": showToast ? "block" : "none"}}>
                    <ToastMessage
                        closeToast={this.closeToast}
                        showToast={showToast}
                        error={error}
                        message={message}
                    />
                </div>
                {songList.length > 0 ? <Form>
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
                                <option id={song.id} key={count} value={song.id}>
                                    {song.name}
                                </option>
                            ))}
                        </Form.Control>
                    </div>
                    {activeImage.length > 30 ?
                        <Image src={activeImage} width={"100%"}
                               height={"100%"}/> : ''}
                    <div>
                        <Button className="card-group"
                                style={{
                                    "width": "15%",
                                    "background": "transparent",
                                    "fontSize": 14,
                                    "color": "white",
                                    "display": "inline"
                                }}>
                            <Link style={{"background": "transparent", "fontSize": 14, "color": "white"}}>
                                NEW
                            </Link>
                        </Button>
                        <Form.Control
                            style={{
                                "width": "67%",
                                "fontSize": 22,
                                "display": "inline",
                                "marginRight": "5px",
                                "marginLeft": "5px"
                            }}
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
                        <Button className="card-group"
                                style={{
                                    "align": "right",
                                    "width": "15%",
                                    "background": "transparent",
                                    "fontSize": 14,
                                    "color": "white",
                                    "display": "inline"
                                }}>
                            <Link style={{"background": "transparent", "fontSize": 14, "color": "white"}}>
                                EDIT
                            </Link>
                        </Button>
                    </div>
                </Form> : <img src={logo} className="App-logo" alt="logo"/>}
            </div>
        );
    }
}



