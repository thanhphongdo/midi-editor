import { Track } from "./Track";
import { useMidiEditorContext } from "../providers/MidiEditorProvider.Context";

export function Tracks() {
    const { gridOptions, song } = useMidiEditorContext();

    return <div className="flex-1">
        <div className="flex gap-2 md:gap-4" style={{ height: (gridOptions.maxDuration + gridOptions.interval) * gridOptions.timeScalePer1s }}>
            {song.trackLabels.map((label, index) => <Track
                key={label}
                track={index + 1}
                title={label}
                notes={song.notes.filter(note => note.track === (index + 1))}
            />)}
        </div>
    </div>
}