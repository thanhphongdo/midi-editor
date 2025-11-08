import { useMidiEditorContext } from "../providers/MidiEditorProvider.Context";

export function PlayerLine() {
  const { player, gridOptions } = useMidiEditorContext();
  return (
    <>
      {(player.state === "PLAYING" || player.time > 0) && (
        <div
          className="absolute w-[calc(100%_+_0.5rem)] md:w-[calc(100%_+_1rem)] bg-red-500 h-[2px] -left-2 md:-left-4 z-0"
          style={{
            top:
              gridOptions.timeScalePer1s * player.time - (player.time ? 2 : 0),
          }}
        ></div>
      )}
    </>
  );
}
