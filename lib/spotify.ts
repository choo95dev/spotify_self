import SpotifyWebApi from "spotify-web-api-node";
import { URLSearchParams } from "url";

const scopes = [
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collabrative",
    "user-read-email",
    "streaming",
    "user-read-private",
    "user-library-read",
    "user-top-read",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-follow-read",
    //"user-library-modify"
].join(',');

const params = {
    scopes:scopes
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL=`https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyWebApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET
});

export default spotifyWebApi;
export { LOGIN_URL };
