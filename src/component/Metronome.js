import React, {Component} from "react";
import bipWav from "../bip.wav";
import bip from "../click1.wav";

export default class Metronome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bpm: props.temp,
            playing: props.play,
            count: 0,
            timerID: '',
        }
        console.log("METRONOME: CONSTRUCTOR. Playing=" + props.play);
        this.click1 = new Audio(bip);
        this.click2 = new Audio(bipWav);
     //   this.handleBPM = this.handleBPM.bind(this);
        this.updateInterval = this.updateInterval.bind(this);
     //   this.startStop = this.startStop.bind(this);
        this.playClick = this.playClick.bind(this);
    }

    updateInterval() {
        console.log("METRONOME: UPDATE INTERVAL");
        const bmpSpeed = 60 * 1000 / this.props.temp;
        this.setState({
            timerId: setInterval(this.playClick, bmpSpeed)
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //  console.log("METRONOME: COMPONENT DID UPDATE. Playing= "+this.props.play + " with temp = "+this.props.temp);
        console.log("PREVPROPS= " + prevProps.play + ". NEWPROPS= " + this.props.play);
        console.log("PREVPROPS= " + prevProps.temp + ". NEWPROPS= " + this.props.temp);
        if ((!prevProps.play && this.props.play) || (prevProps.temp != this.props.temp && this.props.play)) {
            clearInterval(this.state.timerId);
            this.updateInterval();
        } else if (prevProps.play && !this.props.play) {
            clearInterval(this.state.timerId);
        }
    }

  /*  handleBPM(event) {
        console.log("METRONOME: HANDLEBPM");
        const bpm = event.target.value;
        if (this.state.playing) {
            clearInterval(this.timer);
            this.updateInterval();
            this.setState({
                count: 0,
                bpm
            });
        } else {
            this.setState({
                bpm
            });
        }
        ;
    }*/

    playClick() {
        console.log("METRONOME: PLAYCLICK");
        if (this.state.count === 0) this.click2.play();
        else this.click1.play();
        this.setState({
            count: this.state.count + 1
        });
    }

 /*   startStop() {
        console.log("METRONOME: START-STOP");
        if (this.state.playing) {
            clearInterval(this.timer);
            this.setState({
                playing: false
            });
        } else {
            this.updateInterval();
            this.setState({
                count: 0,
                playing: true
            }, this.playClick)
        }
    }*/

    render() {
        return (
            <div/>
            /*   <h1>Metronome</h1>
               <Slider bpm={this.state.bpm} handleChange={this.handleBPM}/>
               <Button handleClick={this.startStop} currentState={this.state.playing}/>
           </div>*/
        );
    }
}
/*
class Button extends React.Component {
    render() {
        return (
            <button onClick={this.props.handleClick}>
                {this.props.currentState ? "Stop" : "Start"}
            </button>
        );
    }
}

class Slider extends React.Component {
    render() {
        return (
            <div id="bpm-slider">
                <div>{this.props.bpm} BPM</div>
                <input type="range" min="60" max="240" value={this.props.bpm} onChange={this.props.handleChange}/>
            </div>
        );
    }
}*/