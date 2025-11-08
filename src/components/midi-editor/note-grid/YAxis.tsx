import { memo } from "react";
import { useMidiEditorContext } from "../providers/MidiEditorProvider.Context";

function YAxisEle() {
  const { gridOptions } = useMidiEditorContext();
  const sticks = Array.from(
    { length: gridOptions.maxDuration / gridOptions.interval },
    (_, i) => ({
      time: (i + 1) * gridOptions.interval,
      height: (i + 1) * gridOptions.interval * gridOptions.timeScalePer1s,
    })
  );

  return (
    <div
      style={{
        height:
          (gridOptions.maxDuration + gridOptions.interval) *
          gridOptions.timeScalePer1s,
      }}
      className="w-16 bg-dark-1000 !text-white"
    >
      {/* <div className="border-r-2 border-red-400/40 relative bg-dark-1000">
            <div className="h-6 absolute right-4 -bottom-2">0s</div>
            <div className="border-b-2 border-red-400/40 w-2 absolute right-0 bottom-[-2px] z-30"></div>
        </div> */}
      {sticks.map((item) => (
        <div
          key={item.time}
          style={{
            height: gridOptions.timeScalePer1s * gridOptions.interval,
          }}
          className="border-r-2 border-red-400/40 relative bg-dark-1000"
        >
          <div className="h-6 absolute right-4 -bottom-2 z-30">
            {item.time}s
          </div>
          <div className="border-b-2 border-red-400/40 w-2 absolute right-0 bottom-0 z-30"></div>
        </div>
      ))}
      <div
        className="border-r-2 border-red-400/40 relative bg-dark-1000"
        style={{
          height: gridOptions.timeScalePer1s * gridOptions.interval,
        }}
      ></div>
    </div>
  );
}

export const YAxis = memo(YAxisEle);
