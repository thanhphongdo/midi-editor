import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { MidiEditor, Song } from "../definitions";
import { Songs } from "../mocks/songs";

export interface MidiEditorListStore extends MidiEditor {
  getSongById: (id: string) => Song | undefined;
  updateSong: (name: string, song: Partial<Song>) => void;
  addSong: (song: Song) => void;
  removeSong: (name: string) => void;
  overwriteSong: (song: Song) => void;
}

export const useMidiEditorStore = create<MidiEditorListStore>()(
  persist(
    (set, get) => ({
      songs: Songs,
      getSongById: (id: string) => {
        return get().songs.find((song) => song.id === id);
      },
      updateSong: (id: string, song: Partial<Song>) => {
        set((state) => ({
          ...state,
          songs: state.songs.map((s) => (s.id === id ? { ...s, ...song } : s)),
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
      overwriteSong: (song: Song) => {
        set((state) => {
          const index = state.songs.findIndex((s) => s.id === song.id);
          if (index === -1) return state;
          const updatedSongs = [...state.songs];
          updatedSongs[index] = song;
          return { ...state, songs: updatedSongs };
        });
      },
    }),
    {
      name: "midi-editor-list",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
