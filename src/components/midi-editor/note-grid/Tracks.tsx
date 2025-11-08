import { Track } from "./Track";
import { useMidiEditorContext } from "../providers/MidiEditorProvider.Context";
import { TrackTitle } from "../../../definitions";
import { memo, useCallback, useMemo } from "react";

function TracksEle() {
  const { gridOptions, song } = useMidiEditorContext();

  const trackLabels = useMemo(() => song.trackLabels, [song.trackLabels]);
  const notes = useCallback(
    (track: number) => song.notes.filter((note) => note.track === track),
    [song.notes]
  );

  return (
    <div className="flex-1">
      <div
        className="flex gap-2 md:gap-4"
        style={{
          height:
            (gridOptions.maxDuration + gridOptions.interval) *
            gridOptions.timeScalePer1s,
        }}
      >
        {/* <div className="w-4 h-12 bg-green-500 sticky top-0 left-12 z-50"></div> */}
        {trackLabels.map((label, index) => (
          <Track
            key={label}
            track={index + 1}
            title={label}
            // notes={song.notes.filter(note => note.track === (index + 1))}
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
    </div>
  );
}

export const Tracks = memo(TracksEle);
