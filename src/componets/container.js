import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {List, ListItem, ListItemText, Divider} from '@material-ui/core';
import withStyles from "@material-ui/core/styles/withStyles";

const useStyle = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: 10,
        maxWidth: 1000,
        alignContent: 'center',
        backgroundColor: theme.palette.background.paper,
    },
    item: {
        textAlign: "right",
        paddingRight: 15,
    }
}));

class ListItemLink extends React.Component {
    render() {
        const props = this.props;
        return <ListItem button component="a" {...props} />;
    }
}

class Container extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props)
        this.props.onChangeRef(this)
    }

    test = (number) => {
        console.log(number)
    };

    render() {
        const {classes} = this.props;
        return (<React.Fragment>
            <List component="nav" aria-label="Secondary mailbox folders" className={classes.root}>
                <Divider/>
                <ListItemLink href="#simple-list">
                    <ListItemText primary="会员号"/>
                    <ListItemText primary="1234567890" className={classes.item}/>
                </ListItemLink>
            </List>
        </React.Fragment>)
    }
}


export default withStyles(useStyle)(Container)

// export default function Content(props) {
//
//     const classes = useStyle(this);
//     const {user} = props;
//
//     function ListItemLink(props) {
//         return <ListItem button component="a" {...props} />;
//     }
//
//     return (
//         <List component="nav" aria-label="Secondary mailbox folders" className={classes.root}>
//             <Divider/>
//             {user}
//             <ListItemLink href="#simple-list">
//                 <ListItemText primary="名称"/>
//                 <ListItemText primary="1234567890" className={classes.item}/>
//             </ListItemLink>
//         </List>
//     );
// }
