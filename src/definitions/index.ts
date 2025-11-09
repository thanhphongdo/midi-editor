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

export const TrackColor = {
  [TrackTitle.Kick]: "#FF3B3B",
  [TrackTitle.Snare]: "#3399FF",
  [TrackTitle.HiHat]: "#FFFF33",
  [TrackTitle.Crash]: "#FF9933",
  [TrackTitle.Ride]: "#12B886",
  [TrackTitle.Tom1]: "#CC33FF",
  [TrackTitle.Tom2]: "#FF66B2",
  [TrackTitle.Tambourine]: "#33FFFF",
  [TrackTitle.LeadSynth]: "#91A7FF",
  [TrackTitle.Bass]: "#40C057",
  [TrackTitle.Pad]: "#4C6EF5",
  [TrackTitle.Arp]: "#FF33CC",
  [TrackTitle.FX]: "#A61E4D",
} as const;

export type Note = {
  track: number;
  time: number;
  title: TrackTitle;
  description?: string;
  color: string;
};

export type Song = {
  id: string;
  name: string;
  description: string;
  totalDuration: number;
  trackLabels: TrackTitle[];
  notes: Note[];
  isDraft?: boolean;
};

export type MidiEditor = {
  songs: Song[];
};
