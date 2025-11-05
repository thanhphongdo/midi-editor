import { useState } from "react";
import { Note as NoteProps } from "../../../definitions";

export function Note(props: Partial<NoteProps> & { isHint?: boolean }) {
    const [gridOptions, setGridOptions] = useState({
        trackWidth: 120,
        timeScalePer1s: 24
    });
    const interval = 5;
    const maxDuration = 300;

    const [focused, setFocused] = useState(false);

    return <div className="absolute z-10 w-3 h-3 flex justify-center items-center cursor-pointer" style={{
        top: props.time! * gridOptions.timeScalePer1s - 6,
    }} onMouseEnter={() => {
        setFocused(true)
    }} onMouseLeave={() => {
        setFocused(false)
    }}>
        <div className={[
            'w-2 h-2 rounded-full',
            props.isHint ? 'bg-transparent' : 'bg-red-500',
            focused && props.isHint ? '!bg-red-500/50' : ''
        ].join(' ')}></div>
    </div>;
}