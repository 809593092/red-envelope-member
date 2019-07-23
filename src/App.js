import React from 'react';
import HomeIndex from "./pages/home";
import CssBaseline from '@material-ui/core/CssBaseline';
import {BrowserRouter as Router, Route} from "react-router-dom";
import { ThemeProvider } from '@material-ui/styles';
import {createMuiTheme} from "@material-ui/core";
import Login from './pages/user/login'
// import red from "@material-ui/core/colors/red"


const theme = createMuiTheme({
    palette: {
        // primary: red,
        // secondary: green,
    }
});
class App extends React.Component {

    render() {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Router>
                    <Route exact path="/" component={HomeIndex}/>
                    <Route path="/login" component={Login}/>
                </Router>
            </ThemeProvider>
        );
    }
}

export default App;
