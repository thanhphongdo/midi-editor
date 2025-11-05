export enum TrackTitle {
  Kick = "Kick",
  Snare = "Snare",
  HiHat = "Hi-Hat",
  Crash = "Crash",
  Ride = "Ride",
  Tom1 = "Tom 1",
  Tom2 = "Tom 2",
  Tambourine = "Tambourine",
  LeadSynth = "Lead Synth",
  Bass = "Bass",
  Pad = "Pad",
  Arp = "Arp",
  FX = "FX",
}

export type Note = {
  track: number;
  time: number;
  title: TrackTitle;
  description?: string;
  color: string;
}

export type Song = {
  id: string;
  name: string;
  description: string;
  totalDuration: number;
  trackLabels: TrackTitle[];
  notes: Note[];
  isDraft?: boolean;
}

export type MidiEditor = {
  songs: Song[];
  draftSongs?: Song[];
};
