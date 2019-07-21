import React from 'react';
import HomeIndex from "./pages/home";
import CssBaseline from '@material-ui/core/CssBaseline';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from './pages/user/login'


class App extends React.Component {

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <Router>
                    <Route exact path="/" component={HomeIndex}/>
                    <Route path="/login" component={Login}/>
                </Router>
            </React.Fragment>
        );
    }
}

export default App;
