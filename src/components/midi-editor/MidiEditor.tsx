import { Song } from "../../definitions";
import { Actions } from "./Actions";
import { NoteGrid } from "./note-grid/NoteGrid";
import { MidiEditorProvider } from "./providers/MidiEditorProvider";
import { SongDesc } from "./SongDesc";
import { SongTitle } from "./SongTitle";

export function MidiEditor(props: Song) {
    return <MidiEditorProvider id={props.id}>
        <div className="flex flex-col gap-4 h-full">
            <div className="flex items-center gap-4">
                <div className="flex-1 flex gap-4 flex-col">
                    <SongTitle />
                    <SongDesc />
                </div>
            </div>
            <div className="flex-1 w-full h-[calc(100%_-_6rem)]">
                <NoteGrid />
            </div>

            <Actions id={props.id} />
        </div>
    </MidiEditorProvider>
}