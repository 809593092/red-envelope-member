import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {fade} from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';
import Message from "./message"


const useStyle = theme => ({
    root: {
        flexGrow: 1,
    },
    toolbar: {
        maxWidth: 10000,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: '100%',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
});

/**
 * 头部导航
 */
class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            member: '',
            message: null,
        };
        this.onBindMessageRef.bind(this);
        this.props.onChange.bind(this)
        // this.props.onSearchChanged(this)

    }

    handlerInputChanged(event) {
        this.setState({member: event.target.value})
    }

    handlerSearchClick(event) {
        let member = this.state.member;
        if (member === "") {
            this.message.showMessage("会员号不能为空");
            return false
        }
        // 判断是否是数字
        if (isNaN(member)) {
            this.message.showMessage("会员号不正确 ");
            return false
        }
        // 判断长度是否是13位数字
        if (member.length !== 13) {
            this.message.showMessage("请输入正确的13位会员号");
            return false
        }
        this.props.onChange(member);
        // @todo
        // this.setState({member: ""})
    };

    onBindMessageRef = (ref) => {
        this.message = ref;
    };

    handlerOnKeyPress = (event) =>{
        if (event.nativeEvent.keyCode === 13) {
            this.handlerSearchClick(event);
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Message show={false} message={""} onBindMessageRef={this.onBindMessageRef}/>
                <AppBar position="static">
                    <Toolbar className={classes.toolbar} component={"div"}
                             disableGutters={false}
                             variant={"regular"}
                    >
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                autoFocus={true}
                                value={this.state.member}
                                onChange={this.handlerInputChanged.bind(this)}
                                placeholder="输入会员号查询"
                                type="number"
                                pattern="[0-9]*"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                onKeyPress={this.handlerOnKeyPress.bind(this)}
                                inputProps={{'aria-label': 'Search'}}
                            />
                        </div>
                        <Button className={classes.button} color={"inherit"}
                                onClick={this.handlerSearchClick.bind(this)}>搜&nbsp;索&nbsp;</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(useStyle)(Header);
