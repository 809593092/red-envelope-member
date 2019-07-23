import React from 'react';
// import cookie from 'react-cookies'
import withStyles from "@material-ui/core/styles/withStyles";
import {withRouter} from "react-router";
import BaseUser from "./base_user";
import Footer from "../../componets/footer";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Message from "../../componets/message";
import User from '../../store/user';
import "../../global.css"

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
        display: 'flex',
        flexDirection: 'column', // 盒子垂直布局
        // marginBottom: 10
        // overflow: "scroll",
        overflowX: "hidden",
        height: '100vh',
        // width: '100%'
    },
    container: { // 容器
        display: 'flex',
        flexDirection: 'column', // 盒子垂直布局
        // backgroundColor: 'red',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 200,
    },
    footer: {
        height: 'auto',
        width: '100%',
        textAlign: "center",
    },
    loginHeader: {
        textAlign: "center",
        flexGrow: 1,
    },
    panel: {
        width: "95%",
        height: 200,
        textAlign: 'center',
        // border: '1px solid #61dafb',
        borderRadius: '5px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logBtn: {
        marginTop: 30,
        width: '80%',
    }
});


class Login extends BaseUser {

    SUCCESS = "#00CC99";
    ERROR = "#CC3333";
    DEFAULT = "#3f51b5";

    constructor(props) {
        super(props);


        this.state = {
            userNameStyle: this.DEFAULT, // 用户名的样式
            passwordStyle: this.DEFAULT, // 密码样式
            username: "",
            password: ""
        };

        this.onBindMessageRef.bind(this);
        // let params = new URLSearchParams(this.props.location.search);
        // console.log(params.get("login"))
    }


    componentDidMount() {
        // 判断cookie是否存在，如果是存在则直接去首页
        if (localStorage.getItem("token") !== null) {
            // 去首页
            this.props.history.push("/");
        }

        // this.message.showMessage("anchorOrigin")
    }

    onBindMessageRef = (ref) => {
        this.message = ref;
    };

    handlerUserNameChange(event) {

        let phone = event.target.value;
        this.setState({username: phone});
        if (phone.length >= 11) {
            if (!this.verifyPhone(phone)) {
                this.message.showMessage("登录的手机号码格式不正确");
                this.setState({
                    userNameStyle: this.ERROR
                });
            } else {
                this.setState({
                    userNameStyle: this.SUCCESS,
                    username: phone
                });
            }
        } else {
            this.setState({
                userNameStyle: this.DEFAULT
            });
        }
    }

    handleOnChangePassword = (event) => {
        let password = event.target.value;
        this.setState({password});
        if (password.length >= 6 && password.length <= 32) {
            this.setState({
                passwordStyle: this.SUCCESS,
                password: password
            })
        } else if (password.length > 32) {
            this.setState({
                passwordStyle: this.ERROR,
            })
        } else {
            this.setState({
                passwordStyle: this.DEFAULT,
            })
        }
    };

    handleClickLogin = () => {
        // const uid = 100;
        // cookie.save('userId', uid, {path: '/'});
        let username = this.state.username;
        let password = this.state.password;
        // 验证登录格式不正确
        if (!this.verifyPhone(username)) {
            this.message.showMessage("登录的手机号码格式不正确");
            this.setState({
                userNameStyle: this.ERROR
            });
            return false
        }

        if (!(password.length >= 6 && password.length <= 32)) {
            this.message.showMessage("手机号码格式在6-32位之间");
            return false
        }

        let then = this;

        // 开始真正的表演
        User.prototype.login(username, password).then(response => {
            // 判断是否登录成功
            if (response.data.status === 200) {
                // 登录成功
                // then.message.showMessage(response.data.msg);
                // cookie.save("token", response.data.data, {path: "/"});
                localStorage.setItem("token", response.data.data);
                then.props.history.push("/");
            } else {
                then.message.showMessage(response.data.msg);
            }

        }).catch(error => {
            console.log(error)
        })

    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Message show={false} message={""} onBindMessageRef={this.onBindMessageRef}/>
                <div className={classes.header}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6">老魏 找温暖</Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <div className={classes.main}>
                    {/*定义一个登录面板*/}
                    <div className={classes.container}>
                        <div className={classes.panel}>
                            <input style={{borderBottomColor: this.state.userNameStyle}}
                                   value={this.state.username}
                                   maxLength={11}
                                   autoFocus={true}
                                   name={"phone"}
                                   type={"number"}
                                   pattern={"[0-9]*"}
                                   className={"input"}
                                   onChange={this.handlerUserNameChange.bind(this)}
                                   placeholder={"输入手机号"}/>
                            <input type={"password"} style={{borderBottomColor: this.state.passwordStyle}}
                                   value={this.state.password}
                                   name={"password"} className={"input"}
                                   onChange={this.handleOnChangePassword.bind(this)} placeholder={"登录密码"}
                                   maxLength={20}/>
                            <Button variant="contained" color="primary"
                                    className={classes.logBtn}
                                    onClick={this.handleClickLogin.bind(this)}>温&nbsp;&nbsp;暖</Button>
                        </div>
                    </div>
                </div>
                <div className={classes.footer}>
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default withRouter(withStyles(useStyle())(Login));
