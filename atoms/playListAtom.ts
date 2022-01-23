import {atom} from "recoil";
import { SpotifyPlayList } from "../components/type/spotifyType";

export const playListIdState = atom({
    key:'playListIdState',
    //TODO:Find a public playlist id instead of my own 1
    default:'6FdDB21QS8Z28eidSArTvh'
})

export const playListState = atom<SpotifyPlayList>({
    key:'playListState',
    default:null
})