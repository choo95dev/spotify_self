import {
  HeartIcon,
  VolumeUpIcon as VolumeDonwIcon,
} from "@heroicons/react/outline";
import {
  RewindIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  VolumeUpIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";
import { debounce } from "lodash";

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const songInfo = useSongInfo();
  const [hasActiveDevice,setHasActiveDevice] = useState(false);

  const fetchCurrentSong = async () => {
    if (!songInfo) {
      const currentTrack = await spotifyApi.getMyCurrentPlayingTrack();
      setCurrentTrackId(currentTrack.body?.item?.id);
      const playBackState = await spotifyApi.getMyCurrentPlaybackState();
      console.log(playBackState);
      setIsPlaying(playBackState.body?.is_playing);
    }
  };

  const checkActiveDevice = async () =>{
    const response = await spotifyApi.getMyDevices();
    setHasActiveDevice(response.body.devices.length > 0);
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      checkActiveDevice();
      //fetch song info
      if(hasActiveDevice){
        fetchCurrentSong();
        setVolume(50);
      }

    }
  }, [currentTrackId, spotifyApi, session,hasActiveDevice]);

  //debounce good for many input, example the volume
  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debounceAdjustVolume(volume);
    }
  }, [volume]);

  const debounceAdjustVolume = useCallback(
    debounce((volume) => {
        if(hasActiveDevice){
            spotifyApi.setVolume(volume);
        }
    }, 500),
    [hasActiveDevice]
  );

  const handlePlayPause = async () => {
    if(hasActiveDevice){
        const playBackState = await spotifyApi.getMyCurrentPlaybackState();
        console.log(playBackState);
        if (playBackState.body?.is_playing) {
          spotifyApi.pause();
          setIsPlaying(false);
        } else {
          spotifyApi.play();
          setIsPlaying(true);
        }
    }
  };

  return (
    <div className="text-white h-24 bg-gradient-to-b from-black to-gray-900 grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      {/* Left hand side song info */}
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album.images?.[0].url}
          alt=""
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      {/* Center */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="playerButton" />
        <RewindIcon className="playerButton" />
        {isPlaying ? (
          <PauseIcon
            onClick={handlePlayPause}
            className="playerButton w-10 h-10"
          />
        ) : (
          <PlayIcon
            onClick={handlePlayPause}
            className="playerButton w-10 h-10"
          />
        )}
        <FastForwardIcon className="playerButton" />
        <ReplyIcon className="playerButton" />
      </div>
      {/* Right Hand Side */}
      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <VolumeDonwIcon
          onClick={() => volume > 0 && setVolume(volume - 10)}
          className="playerButton"
        />
        <input
          className="w-14 md:w-28"
          type="range"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          min={0}
          max={100}
        />
        <VolumeUpIcon
          onClick={() => volume < 100 && setVolume(volume + 100)}
          className="playerButton"
        />
      </div>
    </div>
  );
}

export default Player;
