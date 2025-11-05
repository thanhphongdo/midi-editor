import { useState } from "react";

export function YAxis() {
    const [gridOptions, setGridOptions] = useState({
        trackWidth: 120,
        timeScalePer1s: 24
    });
    const maxDuration = 300;
    const interval = 5;
    const sticks = Array.from({ length: (maxDuration / interval) }, (_, i) => ({
        time: (i + 1) * interval,
        height: ((i + 1) * interval) * gridOptions.timeScalePer1s
    }));

    return <div style={{
        height: (maxDuration + interval) * gridOptions.timeScalePer1s
    }} className="w-16">
        <div className="border-r-2 border-red-400/40 relative bg-[var(--mantine-color-body)]">
            <div className="h-6 absolute right-4 -bottom-2 z-30">0s</div>
            <div className="border-b-2 border-red-400/40 w-2 absolute right-0 bottom-[-2px] z-30"></div>
        </div>
        {
            sticks.map(item => <div key={item.time} style={
                {
                    height: gridOptions.timeScalePer1s * interval,
                }
            } className="border-r-2 border-red-400/40 relative bg-[var(--mantine-color-body)]">
                <div className="h-6 absolute right-4 -bottom-2 z-30">{item.time}s</div>
                <div className="border-b-2 border-red-400/40 w-2 absolute right-0 bottom-0 z-30"></div>
            </div>)
        }
        <div className="border-r-2 border-red-400/40 relative bg-[var(--mantine-color-body)]" style={{
            height: gridOptions.timeScalePer1s * interval
        }}></div>
    </div>
}