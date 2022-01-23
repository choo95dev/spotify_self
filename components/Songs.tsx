import { useRecoilValue } from "recoil";
import { playListState } from "../atoms/playListAtom";
import Song from "./Song";

function Songs() {
  const playList = useRecoilValue(playListState);
  return (
    playList && 
    <div className="text-white">
      {playList?.tracks.items.map((track, index) => {
        return <Song key={track.track.id} track={track} order={index} />;
      })}
    </div>
    
  );
}

export default Songs;
