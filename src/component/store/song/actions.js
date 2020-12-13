export const ACTION_CHANGE_SONG = 'ACTION_CHANGE_SONG';
export const ACTION_CHANGE_SONG_ID = 'ACTION_CHANGE_SONG_ID';
export const ACTION_CHANGE_INSTRUMENT = 'ACTION_CHANGE_INSTRUMENT';
export const ACTION_CHANGE_SONG_LIST = 'ACTION_CHANGE_SONG_LIST';

export const changeSong = (newSong) => {
    return {
        type: ACTION_CHANGE_SONG,
        payload: newSong,
    }
}

export const changeSongId = (newSongId) => {
    return {
        type: ACTION_CHANGE_SONG_ID,
        payload: newSongId,
    }
}

export const changeInstrument = (instrument) => {
    return {
        type: ACTION_CHANGE_INSTRUMENT,
        payload: instrument,
    }
}
export const changeSongList = (songList) => {
    return {
        type: ACTION_CHANGE_SONG_LIST,
        payload: songList,
    }
}