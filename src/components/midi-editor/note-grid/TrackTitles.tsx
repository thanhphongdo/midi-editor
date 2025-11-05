import { useState } from "react";

export function TrackTitles() {
    const [gridOptions, setGridOptions] = useState({
        trackWidth: 120,
        timeScalePer1s: 24
    });
    const interval = 5;
    const maxDuration = 300;
    return <div className=" h-8 pl-16 w-full bg-red-500">
        <div className="w-[1200px] flex gap-2 md:gap-4 h-full">
            <div className="flex justify-center items-end bg-yellow-100/10" style={{
                width: gridOptions.trackWidth
            }}>
                Track Title
            </div>
            <div className="flex justify-center items-end bg-yellow-100/10" style={{
                width: gridOptions.trackWidth
            }}>
                Track Title
            </div>
            <div className="flex justify-center items-end bg-yellow-100/10" style={{
                width: gridOptions.trackWidth
            }}>
                Track Title
            </div>
            <div className="flex justify-center items-end bg-yellow-100/10" style={{
                width: gridOptions.trackWidth
            }}>
                Track Title
            </div>
            <div className="flex justify-center items-end bg-yellow-100/10" style={{
                width: gridOptions.trackWidth
            }}>
                Track Title
            </div>
            <div className="flex justify-center items-end bg-yellow-100/10" style={{
                width: gridOptions.trackWidth
            }}>
                Track Title
            </div>
            <div className="flex justify-center items-end bg-yellow-100/10" style={{
                width: gridOptions.trackWidth
            }}>
                Track Title
            </div>
            <div className="flex justify-center items-end bg-yellow-100/10" style={{
                width: gridOptions.trackWidth
            }}>
                Track Title
            </div>
        </div>
    </div>
}