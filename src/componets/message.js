import React, {Component} from 'react';
import Snackbar from "@material-ui/core/Snackbar";
import Fade from "@material-ui/core/Fade";
import PropTypes from 'prop-types';

class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: this.props.show,
            message: this.props.message,
            timeOut: 3000,
            Transition: Fade
        };

        this.props.onBindMessageRef(this);
        this.showMessage.bind(this);
    }

    showMessage(message) {
        this.setState({
            open: true,
            message: message
        });
        setTimeout(() => {
            this.handleClose()
        }, 3000)
    }

    handleClose() {
        this.setState({open: false, Fade})
    }

    render() {
        return (
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                autoHideDuration={this.state.timeOut}
                open={this.state.open}
                onClose={this.handleClose.bind(this)}
                TransitionComponent={this.state.Transition}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{this.state.message}</span>}
            />
        )
    }
}

Message.prototypes = {
    classes: PropTypes.object.isRequired,
    index: PropTypes.number,
    style: PropTypes.object,
};

export default Message
