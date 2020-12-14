import React, {Component} from 'react';
import {Toast} from 'react-bootstrap';

export default class ToastMessage extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

handleClick = () =>{
    this.props.closeToast();
}

    render() {
        const toastCss = {
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex: '1',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        };
        const {showToast, error, message, closeToast} = this.props;
        return (
            <div style={showToast ? toastCss : null}>
                <Toast
                    className={!error ? "border border-success bg-success text-white" : "border border-danger bg-danger text-white"}
                    show={showToast}>
                    <Toast.Header
                        className={!error ? "bg-success text-white" : "bg-danger text-white"}
                        closeButton={false} onClick={closeToast}>
                        <strong className={"mr-auto"}>MESSAGE</strong>
                    </Toast.Header>
                    <Toast.Body>
                        {message}
                    </Toast.Body>
                </Toast>
            </div>
        );
    }
}