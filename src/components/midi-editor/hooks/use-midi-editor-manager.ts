import { useState } from "react";
import { useMidiEditorStore } from "../../../stores/store";
import { Song, TrackColor } from "../../../definitions";
import { useDisclosure } from "@mantine/hooks";

export function useMidiEditorManager({ id }: { id: string }) {
  const { getSongById } = useMidiEditorStore();
  const [song, setSong] = useState<Song>(
    JSON.parse(JSON.stringify(getSongById(id)!))
  );
  const [gridOptions, setGridOptions] = useState({
    trackWidth: 120,
    timeScalePer1s: 20,
    maxDuration: 300,
    interval: 5,
  });

  const [
    addNewTrackModalOpened,
    { open: openAddNewTrackModal, close: closeAddNewTrackModal },
  ] = useDisclosure(false);

  const resetSong = () => {
    setSong(JSON.parse(JSON.stringify(getSongById(id)!)));
  };

  const updateSong = (updatedSong: Partial<Song>) => {
    setSong((prevSong) => ({
      ...prevSong,
      ...updatedSong,
    }));
  };

  const getTrackColor = (name: string, alpha = 1): string => {
    const alphaHex = Math.round(Math.max(0, Math.min(alpha, 1)) * 255)
      .toString(16)
      .padStart(2, "0")
      .toUpperCase();
    const color = TrackColor[name as keyof typeof TrackColor] ?? "#868E96";

    return `${color}${alpha === 1 ? "" : alphaHex}`;
  };

  return {
    id,
    song,
    gridOptions,
    addNewTrackModalOpened,
    resetSong,
    openAddNewTrackModal,
    closeAddNewTrackModal,
    updateSong,
    setGridOptions,
    getTrackColor,
  };
}
