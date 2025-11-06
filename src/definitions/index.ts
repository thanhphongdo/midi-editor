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
  [TrackTitle.Kick]: "#FF3B3B", // neon red
  [TrackTitle.Snare]: "#3399FF", // bright neon blue
  [TrackTitle.HiHat]: "#FFFF33", // bright yellow
  [TrackTitle.Crash]: "#FF9933", // bright orange
  [TrackTitle.Ride]: "#33FF77", // neon green
  [TrackTitle.Tom1]: "#CC33FF", // neon purple
  [TrackTitle.Tom2]: "#FF66B2", // neon pink
  [TrackTitle.Tambourine]: "#33FFFF", // neon cyan
  [TrackTitle.LeadSynth]: "#FA5252", // vivid red
  [TrackTitle.Bass]: "#00FF66", // bright lime green
  [TrackTitle.Pad]: "#1122FF", // bright sky blue
  [TrackTitle.Arp]: "#FF33CC", // neon magenta
  [TrackTitle.FX]: "#66FF00", // neon green-yellow
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
  draftSongs?: Song[];
};
