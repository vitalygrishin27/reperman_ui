import {combineReducers} from "redux";
import {songReducer} from "./song/reducers";


export default combineReducers({
    song: songReducer
})