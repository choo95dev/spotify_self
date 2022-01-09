import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { SpotifyPlayList } from "./type/spotifyType";

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playLists, setPlayList] = useState<SpotifyPlayList[]>([]);
  const [playListId,setPlayListId] = useState<string>("");

  useEffect(() => {
    async function fetchPlayList() {
      const response = await spotifyApi.getUserPlaylists();
      setPlayList(response.body.items);
    }
    if (spotifyApi.getAccessToken()) {
      fetchPlayList();
    }
    spotifyApi.setAccessToken(session?.user?.accessToken);
  }, [session, spotifyApi]);

  return (
    //let  y to be scrollable
    <div className="text-gray-500 p-5 text-sm border-gray-900 overflow-y-scroll scrollbar-hide h-screen">
      <div className="space-y-2">
        <button
          className="flex items-center space-x-2 hover:text-white"
          onClick={() => signOut()}
        >
          <p>Logout</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {playLists.length > 0 && playLists.map((playList)=>(
          <p key={playList.id} onClick={()=>setPlayListId(playList.id)}className="cursor-pointer hover:text-white">{playList.name}</p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
