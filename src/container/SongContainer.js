import React, {Component} from "react";
import {connect} from "react-redux";
import {changeInstrument, changeSong, changeSongId, changeSongList} from "../component/store/song/actions";
import Song from "../component/Song";

class SongContainer extends Component {
    render() {
        const {
            song,
            songId,
            songList,
            instrument,
            changeSong,
            changeSongId,
            changeInstrument,
            changeSongList,
            history
        } = this.props;
        return (
            <Song song={song}
                     songId={songId}
                     songList={songList}
                     instrument={instrument}
                     changeSong={changeSong}
                     changeSongId={changeSongId}
                     changeInstrument={changeInstrument}
                     changeSongList={changeSongList}
                     history={history}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        song: state.song.song,
        songId: state.song.songId,
        songList: state.song.songList,
        instrument: state.song.instrument,
    }
}

const mapDispatchToProps = {
    changeSong: changeSong,
    changeSongId: changeSongId,
    changeInstrument: changeInstrument,
    changeSongList: changeSongList
}

export default connect(mapStateToProps, mapDispatchToProps)(SongContainer);