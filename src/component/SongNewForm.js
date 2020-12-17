import React, {Component} from "react";
import {Form, Button, Col, Image} from "react-bootstrap";
import axios from 'axios';
import ToastMessage from "./ToastMessage";
import {SONG_MAIN_ENDPOINT, getEndpoint, getOptions} from "./Welcome";
import {Link} from "react-router-dom";

export default class SongForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            song: {},
            show: false,
            error: false,
            message: '',
            update: false,
            basPicture: '',
            pianoPicture: '',
            drumsPicture: '',
            rhythmGuitarPicture: '',
            guitarPicture: '',
            lyricsPicture: '',
        };
        this.changeName = this.changeName.bind(this);
        this.changeTemp = this.changeTemp.bind(this);
        this.changeTonality = this.changeTonality.bind(this);
        this.changeDefaultPicture = this.changeDefaultPicture.bind(this);
        this.changeBasPicture = this.changeBasPicture.bind(this);
        this.changePianoPicture = this.changePianoPicture.bind(this);
        this.changeDrumsPicture = this.changeDrumsPicture.bind(this);
        this.changeRhythmGuitarPicture = this.changeRhythmGuitarPicture.bind(this);
        this.changeGuitarPicture = this.changeGuitarPicture.bind(this);
        this.changeLyricsPicture = this.changeLyricsPicture.bind(this);
        this.clearLyricsPicture = this.clearLyricsPicture.bind(this);
        this.clearGuitarPicture = this.clearGuitarPicture.bind(this);
        this.clearRhythmGuitarPicture = this.clearRhythmGuitarPicture.bind(this);
        this.clearDrumsPicture = this.clearDrumsPicture.bind(this);
        this.clearPianoPicture = this.clearPianoPicture.bind(this);
        this.clearBasPicture = this.clearBasPicture.bind(this);
        this.clearDefaultPicture = this.clearDefaultPicture.bind(this);
        this.isPartsNotExists = this.isPartsNotExists.bind(this);
        this.createSongType = this.createSongType.bind(this);
    }

    changeName(event) {
        const song = this.state.song;
        song.name = event.target.value;
        this.setState({update: true})
    }

    changeTemp(event) {
        const song = this.state.song;
        song.temp = event.target.value;
        this.setState({update: true})
    }

    changeTonality(event) {
        const song = this.state.song;
        song.tonality = event.target.value;
        this.setState({update: true})
    }

    changeDefaultPicture = event => {
        const song = this.state.song;
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            song.mainPicture = reader.result;
            this.setState({update: true})
        }
        return URL.createObjectURL(event.target.files[0]);

    }

    changeBasPicture = event => {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            this.setState({basPicture: reader.result,})
        }
        return URL.createObjectURL(event.target.files[0]);
    }

    changePianoPicture = event => {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            this.setState({pianoPicture: reader.result,})
        }
        return URL.createObjectURL(event.target.files[0]);
    }

    changeDrumsPicture = event => {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            this.setState({drumsPicture: reader.result,})
        }
        return URL.createObjectURL(event.target.files[0]);
    }

    changeRhythmGuitarPicture = event => {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            this.setState({rhythmGuitarPicture: reader.result,})
        }
        return URL.createObjectURL(event.target.files[0]);
    }

    changeGuitarPicture = event => {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            this.setState({guitarPicture: reader.result,})
        }
        return URL.createObjectURL(event.target.files[0]);
    }

    changeLyricsPicture = event => {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            this.setState({lyricsPicture: reader.result,})
        }
        return URL.createObjectURL(event.target.files[0]);
    }

    clearDefaultPicture() {
        const song = this.state.song;
        song.mainPicture = '';
        document.getElementById('inputDefaultPicture').value = '';
        this.setState({update: true})
    }

    clearBasPicture() {
        document.getElementById('inputBasPicture').value = '';
        this.setState({basPicture: ''})
    }

    clearPianoPicture() {
        document.getElementById('inputPianoPicture').value = '';
        this.setState({pianoPicture: ''})
    }

    clearDrumsPicture() {
        document.getElementById('inputDrumsPicture').value = '';
        this.setState({drumsPicture: ''})
    }

    clearRhythmGuitarPicture() {
        document.getElementById('inputRhythmGuitarPicture').value = '';
        this.setState({rhythmGuitarPicture: ''})
    }

    clearGuitarPicture() {
        document.getElementById('inputGuitarPicture').value = '';
        this.setState({guitarPicture: ''})
    }

    clearLyricsPicture() {
        document.getElementById('inputLyricsPicture').value = '';
        this.setState({lyricsPicture: ''})
    }

    createSongType() {
        const song = this.state.song;
        const parts = [];
        if (this.isPartsNotExists()) {
            song.parts = parts;
            return song;
        }

        if (this.state.basPicture != '') {
            let part = {};
            part.instrument = 'BAS'
            part.picture = this.state.basPicture;
            parts.push(part);
        }
        if (this.state.pianoPicture != '') {
            let part = {};
            part.instrument = 'PIANO'
            part.picture = this.state.pianoPicture;
            parts.push(part);
        }
        if (this.state.drumsPicture != '') {
            let part = {};
            part.instrument = 'DRUMS'
            part.picture = this.state.drumsPicture;
            parts.push(part);
        }
        if (this.state.rhythmGuitarPicture != '') {
            let part = {};
            part.instrument = 'RHYTHM_GUITAR'
            part.picture = this.state.rhythmGuitarPicture;
            parts.push(part);
        }
        if (this.state.guitarPicture != '') {
            let part = {};
            part.instrument = 'GUITAR'
            part.picture = this.state.guitarPicture;
            parts.push(part);
        }
        if (this.state.lyricsPicture != '') {
            let part = {};
            part.instrument = 'LYRICS'
            part.picture = this.state.lyricsPicture;
            parts.push(part);
        }
        song.parts = parts;
        return song;
    }

    isPartsNotExists = () => {
        return this.state.basPicture == '' &&
            this.state.pianoPicture == '' &&
            this.state.drumsPicture == '' &&
            this.state.rhythmGuitarPicture == '' &&
            this.state.guitarPicture == '' &&
            this.state.lyricsPicture == ''
    }

    /*  fetchSongById = (songId) => {
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
      }*/


    saveSong = event => {
        event.preventDefault();
        console.log("BEGIN SAVING");
        axios.post(getEndpoint(SONG_MAIN_ENDPOINT), JSON.stringify(this.createSongType()), getOptions())
            .then((res) => {
                this.setState({
                    show: true,
                    error: false,
                    message: 'Song save was successful.'
                });
                //  this.props.changeName(null);
                // this.props.changeDefaultPicture(null);
                //  this.props.changeSongIdForEdit(-1);

                setTimeout(() => this.setState({"show": false}), 3000);
                setTimeout(() => this.props.history.push('/songs'), 500);
            })
            .catch((error) => {
                console.error("Error" + error);
                this.setState({
                    show: true,
                    error: true,
                    message: 'Error during saving.'
                });
            });
    }

    render() {
        const {
            song,
            show,
            error,
            message,
            basPicture,
            pianoPicture,
            drumsPicture,
            rhythmGuitarPicture,
            guitarPicture,
            lyricsPicture
        } = this.state;
        return (
            <div>
                <div style={{"display": show ? "block" : "none"}}>
                    <ToastMessage
                        show={show}
                        error={error}
                        message={message}
                    />
                </div>
                <Form className={"text-white text-muted"} onSubmit={this.saveSong}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label style={{"fontSize": 20}} column lg={2}>Name</Form.Label>
                            <Form.Control
                                type="text"
                                className="mx-sm-3"
                                value={song.name}
                                required
                                onChange={this.changeName}
                                id="inputName"
                                aria-describedby="inputNameHelpInline"
                                style={{"fontSize": 20, "width": "95%"}}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label style={{"fontSize": 20}} column lg={2}>Temp</Form.Label>
                            <Form.Control
                                type="number"
                                className="mx-sm-3"
                                value={song.temp}
                                onChange={this.changeTemp}
                                id="inputTemp"
                                aria-describedby="inputTempHelpInline"
                                style={{"fontSize": 20, "width": "95%"}}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label style={{"fontSize": 20}} column lg={2}>Tonality</Form.Label>
                            <Form.Control
                                type="text"
                                className="mx-sm-3"
                                value={song.tonality}
                                onChange={this.changeTonality}
                                id="inputTonality"
                                aria-describedby="inputTonalityHelpInline"
                                style={{"fontSize": 20, "width": "95%"}}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label style={{"fontSize": 20}} column lg={2} htmlFor="inputDefaultPhoto">Default
                                picture</Form.Label>
                            <Form.Control
                                type="file"
                                className="mx-sm-3"
                                //value={song.mainPicture}
                                onChange={this.changeDefaultPicture}
                                id="inputDefaultPicture"
                                aria-describedby="inputDefaultPictureHelpInline"
                                style={{"fontSize": 20, "width": "50%", "display": "inline-block"}}
                            />

                            <Image style={{"display": song.mainPicture ? "inline-block" : "none"}}
                                   src={song.mainPicture && song.mainPicture.startsWith("data") ? song.mainPicture : "data:image/png;base64," + song.mainPicture}
                                   rounded width={"50"}
                                   height={"71"}/> &nbsp;&nbsp;
                            <Button size={"sm"}
                                    variant={"outline-danger"}
                                    style={{"display": song.mainPicture ? "inline-block" : "none", "height": "30px"}}
                                    onClick={this.clearDefaultPicture.bind(this)}
                            > Clear
                            </Button>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label style={{"fontSize": 20}} column lg={2} htmlFor="inputBasPicture">Bas
                                picture</Form.Label>
                            <Form.Control
                                type="file"
                                className="mx-sm-3"
                                //value={song.mainPicture}
                                onChange={this.changeBasPicture}
                                id="inputBasPicture"
                                aria-describedby="inputBasPictureHelpInline"
                                style={{"fontSize": 20, "width": "50%", "display": "inline-block"}}
                            />

                            <Image style={{"display": basPicture ? "inline-block" : "none"}}
                                   src={basPicture && basPicture.startsWith("data") ? basPicture : "data:image/png;base64," + basPicture}
                                   rounded width={"50"}
                                   height={"71"}/> &nbsp;&nbsp;
                            <Button size={"sm"}
                                    variant={"outline-danger"}
                                    style={{"display": basPicture ? "inline-block" : "none", "height": "30px"}}
                                    onClick={this.clearBasPicture.bind(this)}
                            > Clear
                            </Button>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label style={{"fontSize": 20}} column lg={2} htmlFor="inputPianoPicture">Piano
                                picture</Form.Label>
                            <Form.Control
                                type="file"
                                className="mx-sm-3"
                                //value={song.mainPicture}
                                onChange={this.changePianoPicture}
                                id="inputPianoPicture"
                                aria-describedby="inputPianoPictureHelpInline"
                                style={{"fontSize": 20, "width": "50%", "display": "inline-block"}}
                            />

                            <Image style={{"display": pianoPicture ? "inline-block" : "none"}}
                                   src={pianoPicture && pianoPicture.startsWith("data") ? pianoPicture : "data:image/png;base64," + pianoPicture}
                                   rounded width={"50"}
                                   height={"71"}/> &nbsp;&nbsp;
                            <Button size={"sm"}
                                    variant={"outline-danger"}
                                    style={{"display": pianoPicture ? "inline-block" : "none", "height": "30px"}}
                                    onClick={this.clearPianoPicture.bind(this)}
                            > Clear
                            </Button>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label style={{"fontSize": 20}} column lg={2} htmlFor="inputDrumsPicture">Drums
                                picture</Form.Label>
                            <Form.Control
                                type="file"
                                className="mx-sm-3"
                                //value={song.mainPicture}
                                onChange={this.changeDrumsPicture}
                                id="inputDrumsPicture"
                                aria-describedby="inputDrumsPictureHelpInline"
                                style={{"fontSize": 20, "width": "50%", "display": "inline-block"}}
                            />

                            <Image style={{"display": drumsPicture ? "inline-block" : "none"}}
                                   src={drumsPicture && drumsPicture.startsWith("data") ? drumsPicture : "data:image/png;base64," + drumsPicture}
                                   rounded width={"50"}
                                   height={"71"}/> &nbsp;&nbsp;
                            <Button size={"sm"}
                                    variant={"outline-danger"}
                                    style={{"display": drumsPicture ? "inline-block" : "none", "height": "30px"}}
                                    onClick={this.clearDrumsPicture.bind(this)}
                            > Clear
                            </Button>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label style={{"fontSize": 20}} column lg={2} htmlFor="inputRhythmGuitarPicture">Rhythm
                                Guitar
                                picture</Form.Label>
                            <Form.Control
                                type="file"
                                className="mx-sm-3"
                                //value={song.mainPicture}
                                onChange={this.changeRhythmGuitarPicture}
                                id="inputRhythmGuitarPicture"
                                aria-describedby="inputRhythmGuitarPictureHelpInline"
                                style={{"fontSize": 20, "width": "50%", "display": "inline-block"}}
                            />

                            <Image style={{"display": rhythmGuitarPicture ? "inline-block" : "none"}}
                                   src={rhythmGuitarPicture && rhythmGuitarPicture.startsWith("data") ? rhythmGuitarPicture : "data:image/png;base64," + rhythmGuitarPicture}
                                   rounded width={"50"}
                                   height={"71"}/> &nbsp;&nbsp;
                            <Button size={"sm"}
                                    variant={"outline-danger"}
                                    style={{"display": rhythmGuitarPicture ? "inline-block" : "none", "height": "30px"}}
                                    onClick={this.clearRhythmGuitarPicture.bind(this)}
                            > Clear
                            </Button>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label style={{"fontSize": 20}} column lg={2} htmlFor="inputGuitarPicture">Guitar
                                picture</Form.Label>
                            <Form.Control
                                type="file"
                                className="mx-sm-3"
                                //value={song.mainPicture}
                                onChange={this.changeGuitarPicture}
                                id="inputGuitarPicture"
                                aria-describedby="inputGuitarPictureHelpInline"
                                style={{"fontSize": 20, "width": "50%", "display": "inline-block"}}
                            />

                            <Image style={{"display": guitarPicture ? "inline-block" : "none"}}
                                   src={guitarPicture && guitarPicture.startsWith("data") ? guitarPicture : "data:image/png;base64," + guitarPicture}
                                   rounded width={"50"}
                                   height={"71"}/> &nbsp;&nbsp;
                            <Button size={"sm"}
                                    variant={"outline-danger"}
                                    style={{"display": guitarPicture ? "inline-block" : "none", "height": "30px"}}
                                    onClick={this.clearGuitarPicture.bind(this)}
                            > Clear
                            </Button>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label style={{"fontSize": 20}} column lg={2} htmlFor="inputLyricsPicture">Lyrics
                                picture</Form.Label>
                            <Form.Control
                                type="file"
                                className="mx-sm-3"
                                //value={song.mainPicture}
                                onChange={this.changeLyricsPicture}
                                id="inputLyricsPicture"
                                aria-describedby="inputLyricsPictureHelpInline"
                                style={{"fontSize": 20, "width": "50%", "display": "inline-block"}}
                            />

                            <Image style={{"display": lyricsPicture ? "inline-block" : "none"}}
                                   src={lyricsPicture && lyricsPicture.startsWith("data") ? lyricsPicture : "data:image/png;base64," + lyricsPicture}
                                   rounded width={"50"}
                                   height={"71"}/> &nbsp;&nbsp;
                            <Button size={"sm"}
                                    variant={"outline-danger"}
                                    style={{"display": lyricsPicture ? "inline-block" : "none", "height": "30px"}}
                                    onClick={this.clearLyricsPicture.bind(this)}
                            > Clear
                            </Button>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} style={{"text-align": "center"}}>
                            <Button style={{"width": "70%"}} size={"lg"} variant={"success"} type="submit">Save</Button>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} style={{"text-align": "center"}}>
                            <Button style={{"width": "70%"}} size={"lg"} variant={"danger"}>
                                <Link style={{"background": "transparent", "fontSize": 20, "color": "white"}} to={"/songs"}>
                                    Cancel
                                </Link>
                            </Button>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </div>
        );
    }
}



