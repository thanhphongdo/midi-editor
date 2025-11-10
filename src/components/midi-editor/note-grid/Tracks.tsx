import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { Track } from "./Track";
import { SortableTrack } from "./SortableTrack";
import { useMidiEditorContext } from "../providers/MidiEditorProvider.Context";
import { TrackTitle } from "../../../definitions";
import { memo, useCallback, useMemo } from "react";
import { PlayerLine } from "./PlayerLine";

function TracksEle() {
  const { gridOptions, song, updateSong } = useMidiEditorContext();

  const trackLabels = useMemo(() => song.trackLabels, [song.trackLabels]);
  const notes = useCallback(
    (track: number) => song.notes.filter((note) => note.track === track),
    [song.notes]
  );

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = trackLabels.indexOf(active.id as TrackTitle);
    const newIndex = trackLabels.indexOf(over.id as TrackTitle);

    if (oldIndex === -1 || newIndex === -1) return;

    const newTrackLabels = arrayMove(trackLabels, oldIndex, newIndex);

    const trackMap: Record<number, number> = {};
    newTrackLabels.forEach((_, i) => (trackMap[i + 1] = i + 1));

    const noteRemap = song.notes.map((note) => {
      const newIdx = newTrackLabels.indexOf(note.title);
      return { ...note, track: newIdx + 1 };
    });

    updateSong({
      trackLabels: newTrackLabels,
      notes: noteRemap,
    });
  };

  return (
    <div className="flex-1">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext
          items={trackLabels}
          strategy={horizontalListSortingStrategy}
        >
          <PlayerLine />
          <div
            className="flex gap-2 lg:gap-4"
            style={{
              height:
                (gridOptions.maxDuration + gridOptions.interval) *
                gridOptions.timeScalePer1s,
            }}
          >
            {trackLabels.map((label, index) => (
              <SortableTrack
                key={label}
                id={label}
                track={index + 1}
                title={label as TrackTitle}
                notes={notes(index + 1)}
              />
            ))}
            <Track
              track={song.trackLabels.length + 1}
              title={"New Track" as TrackTitle}
              notes={[]}
              isAdding
            />
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

export const Tracks = memo(TracksEle);
