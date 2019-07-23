import React from 'react';
import {List, ListItem, ListItemText, Divider} from '@material-ui/core';
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import User from '../store/user'
import 'typeface-roboto';
import Message from "./message";

const useStyle = (theme => ({
    root: {
        width: '100%',
        marginTop: 10,
        // maxWidth: 1000,
        alignContent: 'center',
        backgroundColor: theme.palette.background.paper,
    },
    item: {
        textAlign: "right",
        paddingRight: 15,
    },
    bigAvatar: {
        margin: 10,
        width: 30,
        height: 30,
        textAlign: "right",
    },
    emptyMessage: {
        textAlign: "center",
        marginTop: 20
    },
    vipButton: {
        textAlign: 'center',
        boxSizing: "border-box",
    },
    button: {
        margin: theme.spacing(1),
        width: "80%"
    },
    input: {
        display: 'none',
    },
}));

class Container extends React.Component {

    constructor(props) {
        super(props);
        this.props.onChangeRef(this);
        this.searchButtonOnChanged.bind(this);
        this.state = {
            user: null,
            permission: null
        };

        this.onBindMessageRef.bind(this);
        // console.log(this.getMyDate(1563869317))
    }


    getMyDate = (time) => {
        if (typeof (time) == "undefined") {
            return "";
        }

        time *= 1000;

        let getzf = (num) => {
            //补0操作,当时间数据小于10的时候，给该数据前面加一个0
            if (parseInt(num) < 10) {
                num = '0' + num;
            }
            return num;
        };

        let oDate = new Date(time),
            oYear = oDate.getFullYear(),
            oMonth = oDate.getMonth() + 1,
            oDay = oDate.getDate(),
            oHour = oDate.getHours(),
            oMin = oDate.getMinutes(),
            oSen = oDate.getSeconds(),
            oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin) + ':' + getzf(oSen);//最后拼接时间

        return oTime;
    };

    searchButtonOnChanged = (number) => {
        let then = this;
        User.prototype.fetch(number).then(response => {

            if (response.status !== 200) {
                then.message.showMessage(response.msg)
            } else {
                then.setState({
                    user: response.data.user,
                    permission: response.data.permission
                })
            }

        }).catch(error => {
            console.log(error)
        })
    };

    /**
     * 开通SVIP
     * @param event
     */
    handlerSvipButtonClick = (event) => {
        const then = this;
        User.prototype.dredgeSvip(this.state.user.number).then(response => {
            if (response.status !== 200) {
                then.message.showMessage(response.msg[0]);
            } else {
                then.searchButtonOnChanged(this.state.user.number);
                then.message.showMessage(response.msg[0]);
            }
        }).catch(error => {
            console.log(error)
        })
    };

    onBindMessageRef = (ref) => {
        this.message = ref;
    };

    showUserData(user, permission, classes) {
        return (
            <div>
                <List component="nav" aria-label="Secondary mailbox folders" className={classes.root}>
                    <ListItem component={"a"} button>
                        <ListItemText primary="会员号"/>
                        <ListItemText primary={user.number} className={classes.item}/>
                    </ListItem>
                    <Divider/>
                    <ListItem button component={"a"}>
                        <ListItemText primary="昵称"/>
                        <ListItemText primary={user.nick_name} className={classes.item}/>
                    </ListItem>
                    <Divider/>
                    <ListItem button component={"a"} href="#simple-list">
                        <ListItemText primary="SVIP"/>
                        <ListItemText primary={permission.svip === 1 ? "是" : "否"} className={classes.item}/>
                    </ListItem>
                    <Divider/>
                    {this.getMonthSvipData(permission, classes)}

                </List>
                {this.getSvipButton(permission.svip, classes)}
            </div>);
    };

    getMonthSvipData = (permission, classes) => {
        if (permission.month_svip > 0) {
            return (
                <React.Fragment>
                    <ListItem button component={"a"} href="#simple-list">
                        <ListItemText primary="包月VIP"/>
                        <ListItemText primary={this.getMyDate(permission.month_svip)} className={classes.item}/>
                    </ListItem>
                    <Divider component={"hr"}/>
                </React.Fragment>
            );
        }
    };


    getSvipButton = (svip, classes) => {
        if (!svip) {
            return (<div className={classes.vipButton}>
                <Button variant="contained" color="primary" className={classes.button}
                        onClick={this.handlerSvipButtonClick.bind(this)}>开通SVIP</Button>
            </div>)
        }
    };


    showEmptyMessage = (classes) => {
        return (
            <div>
                <Typography variant="subtitle1" gutterBottom className={classes.emptyMessage}>
                    &nbsp;
                </Typography>
            </div>
        )
    };

    render() {
        const {classes} = this.props;
        return (<React.Fragment>
            <Message show={false} message={""} onBindMessageRef={this.onBindMessageRef}/>
            {this.state.user ?
                this.showUserData(this.state.user, this.state.permission, classes)
                : this.showEmptyMessage(classes)}

        </React.Fragment>)
    }
}

Container.prototypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(useStyle)(Container)
