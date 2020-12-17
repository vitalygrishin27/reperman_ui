import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Welcome from "./component/Welcome";
import SongContainer from "./container/SongContainer";
import SongFormContainer from "./container/SongFormContainer";

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path={"/"} exact component={Welcome}/>
                <Route path={"/songs"} exact component={SongContainer}/>
                <Route path={"/song"} exact component={SongFormContainer}/>
            </Switch>
        </Router>
    );
}