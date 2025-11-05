import { useMidiEditorStore } from "../../stores/store"
import { Song } from "./Song";

export function SongList() {
    const { songs } = useMidiEditorStore();
    return <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4">
        {
            songs.map(song => <Song key={song.name} {...song} />)
        }
    </div>
}