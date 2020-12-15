import React, {Component} from "react";
import {Button, Form, Image} from "react-bootstrap";
import axios from 'axios';
import ToastMessage from "./ToastMessage";
import {getEndpoint, getOptions, SONG_MAIN_ENDPOINT} from "./Welcome";
import logo from "../Loading.png";
import {Link} from "react-router-dom";

const snd = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");

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
            metronomeDelay: 0,
            metronomeIntervalID: '',
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

        if (this.state.metronomeIntervalID) {
            clearInterval(this.state.metronomeIntervalID);
        }
        console.log("NEED Metronome "+ this.state.needMetronome+ " with temp "+temp);
        if (instrument!=='DRUMS') {
            return;
        }
        const metronomeDelay = 1000 / (temp / 60);
        const metronomeIntervalID = setInterval(this.bep, metronomeDelay);
        this.setState({metronomeIntervalID: metronomeIntervalID})
    }

    bep() {
        snd.play();
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
        this.updateMetronome(instrument,song.temp);
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
            console.log("Check active song on server");
            this.setState({needCheckSong: false});
        } else {
            console.log("Waiting previous result of check");
            return;
        }
        axios.get(getEndpoint(SONG_MAIN_ENDPOINT) + "/activeId", getOptions())
            .then(response => {
                if (this.state.song.id !== response.data) {
                    console.log("CheckActiveSongOnServer. old song=" + this.state.song.id + " on server song=" + response.data)
                    this.changeSelectBox(response.data);
                    this.fetchSongById(response.data);
                } else {
                    console.log("CheckActiveSongOnServer. SAME song=" + this.state.song.id + " on server song=" + response.data)
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
        const {songList, activeImage, showToast, error, message} = this.state;
        return (
            <div style={{"margin": 0}} className="Song">
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
                                "margin-right": "5px",
                                "margin-left": "5px"
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



