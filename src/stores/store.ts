import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { MidiEditor, Song } from "../definitions";
import { Songs } from "../mocks/songs";

export interface MidiEditorListStore extends MidiEditor {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  getSongById: (id: string) => Song | undefined;
  getDraftSongById: (id: string) => Song | undefined;
  updateSong: (name: string, song: Partial<Song>) => void;
  updateDraftSong: (name: string, song: Partial<Song>) => void;
  addSong: (song: Song) => void;
  removeSong: (name: string) => void;
  addDraftSong: (song: Song) => void;
  removeDraftSong: (name: string) => void;
}

export const useMidiEditorStore = create<MidiEditorListStore>()(
  persist(
    (set, get) => ({
      isEditing: false,
      songs: Songs,
      draftSongs: [],
      setIsEditing: (isEditing: boolean) => set({ isEditing }),
      getSongById: (id: string) => {
        return get().songs.find((song) => song.id === id);
      },
      getDraftSongById: (id: string) => {
        return get().draftSongs?.find((song) => song.id === id);
      },
      updateSong: (id: string, song: Partial<Song>) => {
        set((state) => ({
          ...state,
          songs: state.songs.map((s) => (s.id === id ? { ...s, ...song } : s)),
        }));
      },
      updateDraftSong: (id: string, song: Partial<Song>) => {
        set((state) => ({
          ...state,
          draftSongs: state.songs.map((s) =>
            s.id === id ? { ...s, ...song } : s
          ),
        }));
      },
      addSong: (song: Song) => {
        set((state) => ({
          ...state,
          songs: [...state.songs, song],
        }));
      },
      removeSong: (id: string) => {
        set((state) => ({
          ...state,
          songs: state.songs.filter((s) => s.id !== id),
        }));
      },
      addDraftSong: (song: Song) => {
        set((state) => ({
          ...state,
          draftSongs: [...(state.draftSongs || []), song],
        }));
      },
      removeDraftSong: (id: string) => {
        set((state) => ({
          ...state,
          draftSongs: (state.draftSongs || []).filter((s) => s.id !== id),
        }));
      },
    }),
    {
      name: "midi-editor-list",
      // storage: createJSONStorage(() => ({
      //   getItem: (name) => {
      //     const str = localStorage.getItem(name);
      //     return str ? JSON.parse(str) : null;
      //   },
      //   setItem: (name, value) => {
      //     const parsedValue = JSON.parse(value);
      //     const { isEditing, ...rest } = parsedValue.state;
      //     const filteredValue = { ...parsedValue, state: rest };
      //     localStorage.setItem(name, JSON.stringify(filteredValue));
      //   },
      //   removeItem: (name) => localStorage.removeItem(name),
      // })),
      storage: createJSONStorage(() => localStorage),
    }
  )
);
