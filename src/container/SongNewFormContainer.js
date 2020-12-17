import React, {Component} from "react";
import {connect} from "react-redux";
import SongNewForm from "../component/SongNewForm";

class SongNewFormContainer extends Component {
    render() {
        const {
            history
        } = this.props;
        return (
            <SongNewForm history={history}/>
        );
    }

}

const mapStateToProps = (state) => {
}

export default connect(mapStateToProps)(SongNewFormContainer);