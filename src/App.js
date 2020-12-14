import './App.css';
//import {Provider} from "react-redux";
//import {applyMiddleware, compose, createStore} from "redux";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
//import rootReducer from "./component/store/reducers";
//import thunk from 'redux-thunk';
import {Container, Row, Col} from 'react-bootstrap';
import Welcome from "./component/Welcome";
import SongContainer from "./container/SongContainer";

//const store = configureStore();

export default function App() {
    const marginTop = {
        marginTop: "20px"
    };
    return (
            <Router>
                    <Row>
                        <Col>
                            <Switch>
                                <Route path={"/"} exact component={Welcome}/>
                                <Route path={"/songs"} exact component={SongContainer}/>
                            </Switch>
                        </Col>
                    </Row>
            </Router>
    );
}


/*function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
}*/