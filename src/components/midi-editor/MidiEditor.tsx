import { Song } from "../../definitions";
import { Actions } from "./Actions";
import { NoteGrid } from "./note-grid/NoteGrid";
import { MidiEditorProvider } from "./providers/MidiEditorProvider";
import { SongTitle } from "./SongTitle";

export function MidiEditor(props: Song) {
    return <MidiEditorProvider id={props.id}>
        <div className="flex flex-col gap-4 h-full">
            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <SongTitle />
                </div>
                <Actions id={props.id} />
            </div>
            <div className="flex-1 w-full h-[calc(100%_-_3.25rem)]">
                <NoteGrid />
            </div>
        </div>
    </MidiEditorProvider>
}