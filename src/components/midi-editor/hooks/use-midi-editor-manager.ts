import { useEffect, useRef, useState } from "react";
import { useMidiEditorStore } from "../../../stores/store";
import { Note, Song, TrackColor } from "../../../definitions";
import { useDisclosure } from "@mantine/hooks";

export function useMidiEditorManager({ id }: { id: string }) {
  const { getSongById, updateSong: updateSongStore } = useMidiEditorStore();
  const [song, setSong] = useState<Song>(
    JSON.parse(JSON.stringify(getSongById(id)!))
  );
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
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
    editNoteModalOpened,
    { open: openEditNoteModal, close: closeEditNoteModal },
  ] = useDisclosure(false);

  const [
    noteListOpened,
    { open: openNoteListModal, close: closeNoteListModal },
  ] = useDisclosure(false);

  const [tagsModalOpened, { open: openTagsModal, close: closeTagsModal }] =
    useDisclosure(false);

  const resetSong = () => {
    setSong(JSON.parse(JSON.stringify(getSongById(id)!)));
  };

  const updateSong = (
    updatedSong: Partial<Song>,
    forcedUpdateStore = false
  ) => {
    setSong((prevSong) => {
      if (forcedUpdateStore) {
        updateSongStore(id, {
          ...prevSong,
          ...updatedSong,
        });
      }
      return {
        ...prevSong,
        ...updatedSong,
      };
    });
  };

  const deleteNote = (note: Partial<Note>) => {
    setSong((prevSong) => ({
      ...prevSong,
      notes: prevSong.notes.filter(
        (n) => !(n.track === note.track && n.time === note.time)
      ),
    }));
  };

  const openUpdateNoteModal = (note: Note) => {
    setCurrentNote(note);
    openEditNoteModal();
  };

  const addNote = (note: Note) => {
    setSong((prevSong) => {
      const notes = [...prevSong.notes, note];
      const totalDuration = Math.max(...notes.map((note) => note.time));
      return {
        ...prevSong,
        notes: [...notes],
        totalDuration,
      };
    });
  };

  const updateNote = (oldNote: Note, newNote: Note) => {
    setSong((prevSong) => {
      const notes = prevSong.notes.map((note) => {
        if (note.track === oldNote.track && note.time === oldNote.time) {
          return newNote;
        }
        return note;
      });
      const totalDuration = Math.max(...notes.map((note) => note.time));
      return {
        ...prevSong,
        notes: [...notes],
        totalDuration,
      };
    });
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

  useEffect(() => {
    if (!editNoteModalOpened) {
      setCurrentNote(null);
    }
  }, [editNoteModalOpened]);

  return {
    id,
    song,
    gridOptions,
    addNewTrackModalOpened,
    editNoteModalOpened,
    noteListOpened,
    tagsModalOpened,
    player,
    gridRef,
    currentNote,
    resetSong,
    openAddNewTrackModal,
    closeAddNewTrackModal,
    openEditNoteModal,
    closeEditNoteModal,
    openNoteListModal,
    closeNoteListModal,
    openTagsModal,
    closeTagsModal,
    updateSong,
    deleteNote,
    openUpdateNoteModal,
    addNote,
    updateNote,
    setGridOptions,
    getTrackColor,
    setPlayer,
    play,
    pause,
    stop,
    zoomInTimeLine,
    zoomOutTimeLine,
    setCurrentNote,
  };
}
