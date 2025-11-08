import { useState } from "react";
import { useMidiEditorStore } from "../../../stores/store";
import { Note, Song, TrackColor } from "../../../definitions";
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

  const [
    noteListOpened,
    { open: openNoteListModal, close: closeNoteListModal },
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

  const deleteNote = (note: Partial<Note>) => {
    setSong((prevSong) => ({
      ...prevSong,
      notes: prevSong.notes.filter(
        (n) => !(n.track === note.track && n.time === note.time)
      ),
    }));
  };

  const addNote = (note: Note) => {
    setSong((prevSong) => ({
      ...prevSong,
      notes: [...prevSong.notes, note],
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
    noteListOpened,
    resetSong,
    openAddNewTrackModal,
    closeAddNewTrackModal,
    openNoteListModal,
    closeNoteListModal,
    updateSong,
    deleteNote,
    addNote,
    setGridOptions,
    getTrackColor,
  };
}
