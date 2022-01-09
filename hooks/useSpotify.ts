import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import spotifyWebApi from "../lib/spotify";

function useSpotify(){
    const {data: session,status} = useSession();
    useEffect(()=>{
        if(session){
            if(session.error === 'RefreshAccessTokenError'){
                signIn();
            }
            spotifyWebApi.setAccessToken(session.user.accessToken);
        }
    },[session]);
    return spotifyWebApi;
}

export default useSpotify;