import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyWebApi,{LOGIN_URL} from "../../../lib/spotify";


async function refreshAccessToken(token:JWT){
  try{
    console.log("What is this token?? >>>>",token);
    spotifyWebApi.setAccessToken(token.accessToken);
    spotifyWebApi.setRefreshToken(token.refreshToken);

    const {body:response} = await spotifyWebApi.refreshAccessToken();
    return{
      ...token,
      accessToken: response.access_token,
      accessTokenExpires: Date.now() + response.expires_in * 1000,
      refreshToken: response.refresh_token ?? token.refreshToken,
    };  
  }catch(error){
    console.log(error)
    return{
      ...token,
      error: 'Refresh access token error'
    }
  }
}

export default NextAuth({
    // Configure one or more authentication providers
    //token rotation : https://next-auth.js.org/tutorials/refresh-token-rotation
    providers: [
      SpotifyProvider({
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        authorization: LOGIN_URL,
      }),
      // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
    pages:{
      signIn:'/login'
    },
    callbacks:{
      async jwt({ token, account, user }){
        //initial sign in
        if(account && user){
          return {
            ...token,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            userName: account.providerAccountId,
            accessTokenExpires: account.expires_at * 1000, //handing expiry times in mill
          }
        }

        //return previous token if access token is not expired
        if(Date.now() < token.accessTokenExpires){
          return token;
        }

        //Access token expires, update or refresh the token
        return await refreshAccessToken(token);

      },
      async session({session,token}){
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.username = token.username;
        
        return session;
      }
    },
});