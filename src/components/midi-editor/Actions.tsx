import { Button, Tooltip } from "@mantine/core";
import {
  IconDeviceFloppy,
  IconList,
  IconPlayerPause,
  IconPlayerPlay,
  IconPlus,
  IconRefreshDot,
  IconRestore,
  IconZoomIn,
  IconZoomOut,
} from "@tabler/icons-react";
import { useMidiEditorStore } from "../../stores/store";
import { useMidiEditorContext } from "./providers/MidiEditorProvider.Context";
import { useMemo } from "react";
import { isEqual } from "lodash";

export function Actions(props: { id: string }) {
  const { updateSong, getSongById } = useMidiEditorStore();
  const {
    song,
    player,
    resetSong,
    openNoteListModal,
    openAddNewNoteModal,
    play,
    pause,
    stop,
    zoomInTimeLine,
    zoomOutTimeLine,
  } = useMidiEditorContext();

  const hasChange = useMemo(() => {
    return !isEqual(getSongById(props.id), song);
  }, [song, getSongById(props.id)]);

  const handleSave = () => {
    updateSong(props.id, song!);
  };

  const handleReset = () => {
    resetSong();
  };

  const handleExport = () => {
    const data = JSON.stringify(song, null, 4);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${song.name || song.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-1">
        <div className="hidden lg:block"></div>
        <div className="flex gap-1 justify-start lg:justify-center select-none">
          <Tooltip label="Zoom Out Time Line" withArrow>
            <div
              className="p-1 bg-blue-500/50 flex justify-center items-center rounded-md cursor-pointer"
              onClick={zoomOutTimeLine}
            >
              <IconZoomOut size={20} />
            </div>
          </Tooltip>
          <Tooltip label="Zoom In Time Line" withArrow>
            <div
              className="p-1 bg-blue-500/50 flex justify-center items-center rounded-md cursor-pointer"
              onClick={zoomInTimeLine}
            >
              <IconZoomIn size={20} />
            </div>
          </Tooltip>
          {player.state === "PAUSED" && (
            <Tooltip label="Play" withArrow>
              <div
                className="p-1 bg-blue-500/50 flex justify-center items-center rounded-md cursor-pointer"
                onClick={play}
              >
                <IconPlayerPlay size={20} />
              </div>
            </Tooltip>
          )}
          {player.state === "PLAYING" && (
            <Tooltip label="Pause" withArrow>
              <div
                className="p-1 bg-blue-500/50 flex justify-center items-center rounded-md cursor-pointer"
                onClick={pause}
              >
                <IconPlayerPause size={20} />
              </div>
            </Tooltip>
          )}
          <Tooltip label="Reset" withArrow>
            <div
              className="p-1 bg-yellow-500/50 flex justify-center items-center rounded-md cursor-pointer"
              onClick={stop}
            >
              <IconRefreshDot size={20} />
            </div>
          </Tooltip>
        </div>
        <div className="flex gap-1 justify-end col-span-2 lg:col-span-1">
          <Button size={"xs"} color={"yellow"} onClick={openAddNewNoteModal}>
            <IconPlus className="lg:hidden inline-block" />
            <span className="hidden lg:inline-block">Add Note</span>
          </Button>
          <Button size={"xs"} color={"orange"} onClick={openNoteListModal}>
            <IconList className="lg:hidden inline-block" />
            <span className="hidden lg:inline-block">Note List</span>
          </Button>
          <Button size={"xs"} color={"green"} onClick={handleExport}>
            <IconList className="lg:hidden inline-block" />
            <span className="hidden lg:inline-block">Export</span>
          </Button>
          <Button
            disabled={!hasChange}
            size={"xs"}
            color={"blue"}
            onClick={handleSave}
          >
            <IconDeviceFloppy className="lg:hidden inline-block" />
            <span className="hidden lg:inline-block">Save</span>
          </Button>
          <Button
            disabled={!hasChange}
            size={"xs"}
            color={"red"}
            onClick={handleReset}
          >
            <IconRestore className="lg:hidden inline-block" />
            <span className="hidden lg:inline-block">Reset</span>
          </Button>
        </div>
      </div>
    </>
  );
}
