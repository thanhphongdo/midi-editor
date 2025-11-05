import { useState } from "react";
import { Track } from "./Track";

export function Tracks() {
    const [gridOptions, setGridOptions] = useState({
        trackWidth: 120,
        timeScalePer1s: 24
    });
    const interval = 5;
    const maxDuration = 300;
    return <div className="flex-1">
        <div className="flex" style={{height: (maxDuration + interval) * gridOptions.timeScalePer1s }}>
            <Track />
            <Track />
            <Track />
            <Track />
            <Track />
            <Track />
            <Track />
            <Track />
            <Track />
            <Track />
            <Track />
            <Track />
            <Track />
            <Track />
            <Track />
            <Track />
        </div>
    </div>
}