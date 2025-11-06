import { Note } from "./Note";
import { Note as NoteProps, TrackTitle } from "../../../definitions";
import { useMidiEditorContext } from "../providers/MidiEditorProvider.Context";

export function Track(props: {
    track: number;
    title: TrackTitle;
    notes: Array<NoteProps>;
}) {
    const { gridOptions, getTrackColor } = useMidiEditorContext();

    const hintNotes = Array.from({
        length: gridOptions.maxDuration * 2
    }, (_, i) => ({
        time: i / 2
    }));

    return <div>
        <div className="h-8 flex items-end justify-center sticky top-0 bg-dark-1000 !text-white z-[15] font-bold">
            {props.title}
        </div>
        <div className="flex justify-center relative mt-4" style={{
            width: gridOptions.trackWidth,
            height: (gridOptions.maxDuration + gridOptions.interval) * gridOptions.timeScalePer1s,
            background: getTrackColor(props.title, 0.1)
        }}>
            <div className="h-full border-l-2"
                style={{
                    borderColor: getTrackColor(props.title, 0.3)
                }}></div>
            {hintNotes.map(note => <Note key={note.time} time={note.time} title={props.title} track={props.track} isHint />)}
            {props.notes.map(note => <Note key={note.time} {...note} />)}
        </div>
    </div>
}