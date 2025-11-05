import { useState } from "react";
import { Songs } from "../../../mocks/songs";
import { Note } from "./Note";

export function Track() {
    const [gridOptions, setGridOptions] = useState({
        trackWidth: 120,
        timeScalePer1s: 24
    });
    const interval = 5;
    const maxDuration = 300;

    const hintNotes = Array.from({
        length: maxDuration * 2
    }, (_, i) => ({
        time: i / 2
    }));

    return <div>
        <div className="h-8 flex items-center justify-center sticky top-0 bg-[var(--mantine-color-body)] z-[15]">
            Track Title
        </div>
        <div className="bg-yellow-300/10 flex justify-center relative mt-4" style={{
            width: gridOptions.trackWidth,
            height: (maxDuration + interval) * gridOptions.timeScalePer1s
        }}>
            <div className="h-full border-l-2 border-red-400/40"></div>
            {hintNotes.map(note => <Note key={note.time} time={note.time} isHint />)}
            {Songs[0].notes.map(note => <Note key={note.time} {...note} />)}
        </div>
    </div>
}