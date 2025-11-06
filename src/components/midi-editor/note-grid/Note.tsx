import { memo, useState } from "react";
import { Note as NoteProps } from "../../../definitions";
import { useMidiEditorContext } from "../providers/MidiEditorProvider.Context";

function NoteEle(props: Partial<NoteProps> & { isHint?: boolean }) {
    const { gridOptions, getTrackColor, updateSong, song } = useMidiEditorContext();
    const [focused, setFocused] = useState(false);
    const handleToggleNote = () => {
        if (props.isHint) {
            const notes = song.notes;
            notes.push({
                track: props.track!,
                time: props.time!,
                title: props.title!,
                description: '',
                color: getTrackColor(props.title!)
            })
            updateSong({
                ...song,
                notes
            })
        } else {
            updateSong({
                ...song,
                notes: song.notes.filter(note => !(note.track === props.track && note.time === props.time))
            })
        }
    }
    
    return <>
        <div className="absolute z-10 w-3 h-3 flex justify-center items-center cursor-pointer rounded-full" style={{
            top: props.time! * gridOptions.timeScalePer1s - 6,
            background: focused ? getTrackColor(props.title!, 0.7) : '',
        }} onMouseEnter={() => {
            setFocused(true)
        }} onMouseLeave={() => {
            setFocused(false)
        }} onClick={handleToggleNote}>
            <div className="w-2 h-2 rounded-full" style={{
                background: props.isHint ? getTrackColor(props.title!, 0.3) : getTrackColor(props.title!),
            }}></div>
            {focused && <div className="absolute left-4 text-sm rounded-sm font-bold bg-white text-dark-1000 px-1">{props.time}s</div>}
        </div>
    </>
}

export const Note = memo(NoteEle);