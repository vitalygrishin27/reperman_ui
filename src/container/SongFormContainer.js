import React, {Component} from "react";
import {connect} from "react-redux";
import SongForm from "../component/SongForm";

class SongFormContainer extends Component {
    render() {
        const {
            song,
            history
        } = this.props;
        return (
            <SongForm song={song}
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