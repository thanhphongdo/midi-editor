import { z } from "zod";

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

const TrackTitleSchema = z.string();

export const NoteSchema = z.object({
  track: z.number(),
  time: z.number().min(0, "Time must be >= 0"),
  title: TrackTitleSchema,
  description: z.string().optional(),
  color: z.string().min(1, "Color is required"),
});

export const SongSchema = z.object({
  id: z.string().or(z.string().min(1, "ID is required")),
  name: z.string().min(1, "Name is required"),
  description: z.string().default(""),
  totalDuration: z.number().min(0, "Total duration must be >= 0"),
  trackLabels: z
    .array(TrackTitleSchema)
    .min(1, "At least one track label required"),
  notes: z.array(NoteSchema).default([]),
  tags: z.array(z.string()).optional(),
  isDraft: z.boolean().optional(),
});

export type Song = z.infer<typeof SongSchema>;
export type Note = z.infer<typeof NoteSchema>;

export type MidiEditor = {
  songs: Song[];
};
