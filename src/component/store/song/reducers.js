import {
    ACTION_CHANGE_SONG,
    ACTION_CHANGE_SONG_ID,
    ACTION_CHANGE_SONG_LIST,
    ACTION_CHANGE_INSTRUMENT
} from "./actions";


const initialState = {
    song: {},
    songId: -1,
    songList: [],
    instrument: '',
}

export const songReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_SONG:
            return {...state, song: action.payload}
        case ACTION_CHANGE_SONG_ID:
            return {...state, songId: action.payload}
        case ACTION_CHANGE_INSTRUMENT:
            return {...state, instrument: action.payload}
        case ACTION_CHANGE_SONG_LIST:
            return {...state, songList: action.payload}
        default:
            break;
    }
    return state;
}