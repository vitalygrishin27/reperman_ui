import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Welcome from "./component/Welcome";
import SongContainer from "./container/SongContainer";

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path={"/"} exact component={Welcome}/>
                <Route path={"/songs"} exact component={SongContainer}/>
            </Switch>
        </Router>
    );
}