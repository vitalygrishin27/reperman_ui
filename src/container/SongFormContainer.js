import React, {Component} from "react";
import {connect} from "react-redux";
import {changeInstrument, changeSong, changeSongId, changeSongList} from "../component/store/song/actions";
import Song from "../component/Song";
import SongForm from "../component/SongForm";

class SongFormContainer extends Component {
    render() {
        const {
            song,
            fetchSongById,
            history
        } = this.props;
        return (
            <SongForm song={song}
                      fetchSongById={fetchSongById}
                      history={history}/>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        song: state.song.song,
    }
}

export default connect(mapStateToProps)(SongFormContainer);