import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";

const useStyle = (theme)=>({
    root: {
        paddingBottom: 10,
    }
});

class Footer extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                温暖走起
            </div>
        );
    }
}

export default withStyles(useStyle)(Footer);
