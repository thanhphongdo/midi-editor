import { useMidiEditorStore } from "../../stores/store";
import { Song } from "./Song";

export function SongList({ filter }: { filter: string }) {
  const { songs } = useMidiEditorStore();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {songs
        .filter((song) => {
          return (
            song.name.toLowerCase().includes(filter.toLowerCase()) ||
            song.description.toLowerCase().includes(filter.toLowerCase()) ||
            song.tags?.some((tag) =>
              tag.toLowerCase().includes(filter.toLowerCase())
            )
          );
        })
        .map((song) => (
          <Song key={song.name} {...song} />
        ))}
    </div>
  );
}
