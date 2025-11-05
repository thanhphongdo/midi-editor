import { useState } from "react";
import { YAxis } from "./YAxis";
import { Tracks } from "./Tracks";
import { TrackTitles } from "./TrackTitles";

export function NoteGrid() {
    const [gridOptions, setGridOptions] = useState({
        trackWidth: 120,
        timeScalePer1s: 24
    });

    return <div className=" w-full h-full flex flex-col border-2 border-red-400/40 rounded-md">
        {/* <div className="h-8 bg-[var(--mantine-color-body)] z-10 absolute w-16"></div> */}
        {/* <TrackTitles /> */}
        <div className="overflow-auto relative flex">
            <div className="w-16 sticky h-auto left-0 z-20 pt-12">
                <div className="w-16 h-12 absolute top-0 left-0 bg-[var(--mantine-color-body)]"></div>
                <YAxis />
            </div>
            <Tracks />
        </div>
    </div>
}