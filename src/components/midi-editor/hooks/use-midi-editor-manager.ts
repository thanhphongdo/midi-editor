import { useEffect, useRef, useState } from "react";
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

  const [player, setPlayer] = useState<{
    state: "PLAYING" | "PAUSED" | "STOPPED";
    time: number;
    scrollMock: number;
  }>({
    state: "PAUSED",
    time: 0,
    scrollMock: 0,
  });

  const playerIntervalRef = useRef<NodeJS.Timer | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);

  const headerHeight = 48;

  const [
    addNewTrackModalOpened,
    { open: openAddNewTrackModal, close: closeAddNewTrackModal },
  ] = useDisclosure(false);

  const [
    addNewNoteModalOpened,
    { open: openAddNewNoteModal, close: closeAddNewNoteModal },
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

  const play = () => {
    setPlayer({
      state: "PLAYING",
      time: player.time,
      scrollMock: 0,
    });

    playerIntervalRef.current = setInterval(() => {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        time: prevPlayer.time + 0.5,
      }));
    }, 500);
  };

  useEffect(() => {
    const gridHeight = (gridRef.current?.clientHeight ?? 0) - headerHeight;
    setPlayer({
      ...player,
      scrollMock: Math.floor(
        (player.time * gridOptions.timeScalePer1s) / gridHeight
      ),
    });
    if (player.time >= gridOptions.maxDuration) {
      setPlayer({
        ...player,
        state: "PAUSED",
      });
      clearInterval(playerIntervalRef.current!);
    }
  }, [player.time]);

  useEffect(() => {
    gridRef.current?.scrollTo({
      top:
        player.scrollMock * gridRef.current?.offsetHeight! -
        headerHeight * player.scrollMock,
      behavior: "smooth",
    });
  }, [player.scrollMock]);

  const pause = () => {
    setPlayer({
      state: "PAUSED",
      time: player.time,
      scrollMock: player.scrollMock,
    });
    clearInterval(playerIntervalRef.current!);
  };

  const stop = () => {
    setPlayer({
      state: "PAUSED",
      time: 0,
      scrollMock: 0,
    });
    clearInterval(playerIntervalRef.current!);
  };

  const zoomInTimeLine = () => {
    if (gridOptions.timeScalePer1s >= 36) {
      return;
    }
    setGridOptions((prevOptions) => ({
      ...prevOptions,
      timeScalePer1s: prevOptions.timeScalePer1s + 4,
    }));
  };

  const zoomOutTimeLine = () => {
    if (gridOptions.timeScalePer1s <= 16) {
      return;
    }
    setGridOptions((prevOptions) => ({
      ...prevOptions,
      timeScalePer1s: prevOptions.timeScalePer1s - 4,
    }));
  };

  return {
    id,
    song,
    gridOptions,
    addNewTrackModalOpened,
    addNewNoteModalOpened,
    noteListOpened,
    player,
    gridRef,
    resetSong,
    openAddNewTrackModal,
    closeAddNewTrackModal,
    openAddNewNoteModal,
    closeAddNewNoteModal,
    openNoteListModal,
    closeNoteListModal,
    updateSong,
    deleteNote,
    addNote,
    setGridOptions,
    getTrackColor,
    setPlayer,
    play,
    pause,
    stop,
    zoomInTimeLine,
    zoomOutTimeLine,
  };
}
