import {atom} from "recoil";

export const currentTrackIdState = atom({
    key:'currentTrackIdState',
    //TODO:Find a public playlist id instead of my own 1
    default:null
})

export const isPlayingState = atom({
    key:'isplayingState',
    default:false
})