import { useEffect, useState } from "react";
import { useMidiEditorStore } from "../../../stores/store";
import { Song, TrackColor } from "../../../definitions";

export function useMidiEditorManager({ id }: { id: string }) {
  const { getSongById, getDraftSongById, updateDraftSong } =
    useMidiEditorStore();
  const [isEditing, setIsEditing] = useState(false);
  const [song, setSong] = useState<Song>(getSongById(id)!);
  const [gridOptions, setGridOptions] = useState({
    trackWidth: 120,
    timeScalePer1s: 20,
    maxDuration: 300,
    interval: 5,
  });

  useEffect(() => {
    if (isEditing) {
      const draftSong = getDraftSongById(id);
      setSong(draftSong!);
    } else {
      const song = getSongById(id);
      setSong(song!);
    }
  }, [isEditing]);

  const updateSong = (updatedSong: Partial<Song>) => {
    if (!isEditing) return;
    setSong((prevSong) => ({
      ...prevSong,
      ...updatedSong,
    }));
    updateDraftSong(id, updatedSong);
  };

  const getTrackColor = (name: string, alpha = 1): string => {
    const alphaHex = Math.round(Math.max(0, Math.min(alpha, 1)) * 255)
      .toString(16)
      .padStart(2, "0")
      .toUpperCase();
    const color = TrackColor[name as keyof typeof TrackColor];

    return `${color}${alpha === 1 ? "" : alphaHex}`;
  };

  return {
    id,
    song,
    isEditing,
    gridOptions,
    setIsEditing,
    updateSong,
    setGridOptions,
    getTrackColor,
  };
}
