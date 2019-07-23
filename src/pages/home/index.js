import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Header from '../../componets/header'
import Container from '../../componets/container'
import Footer from '../../componets/footer'
import PropTypes from "prop-types";
import {withRouter} from "react-router";
// import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyle = (theme) => ({
    root: {
        height: '100vh',
        width: '100%',
        boxSizing: 'border-box', // 设置盒子向内扩展
        display: 'flex',
        flexDirection: 'column', // 盒子垂直布局
        // backgroundColor: 'red'
    },
    header: {
        width: '100%',
        height: 'auto',
        // flex: 1,
    },
    main: {
        // marginTop: 10,
        flex: 1,
        // marginBottom: 10
        // overflow: "scroll",
        overflowX: "hidden",
        height: '100vh',
    },
    container: { // 容器
        // backgroundColor: 'red',
        marginBottom: 10,
    },
    footer: {
        height: 'auto',
        width: '100%',
        textAlign: "center",
    },
});

/**
 *
 */
class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            member: ""
        };


    }

    componentDidMount() {
        // 如果是没有登录的话就跳转到登录界面
        // if (cookie.load("token") === undefined) {
        //     this.props.history.push("/login")
        // }

        if (localStorage.getItem("token") === null) {
            this.props.history.push("/login")
        }
    }

    onSearchChanged = (member) => {
        this.setState({member: member});
        this.container.onChanged(member)
    };

    onContentChangedRef = (ref) => {
        this.container = ref;
    };


    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.header}>
                    <Header onChange={this.onSearchChanged.bind(this)}/>
                </div>
                <div className={classes.main}>
                    <Container onChangeRef={this.onContentChangedRef.bind(this)}/>
                </div>
                <div className={classes.footer}>
                    <Footer/>
                </div>
            </div>
        );
    }
}

Index.prototypes = {
    classes: PropTypes.object.isRequired,
};
export default withRouter(withStyles(useStyle)(Index));
