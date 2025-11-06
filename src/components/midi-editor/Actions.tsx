import { Button, Tooltip } from "@mantine/core";
import { IconDeviceFloppy, IconList, IconPlayerPause, IconPlayerPlay, IconPlus, IconRefreshDot, IconRestore } from "@tabler/icons-react";
import { useMidiEditorStore } from "../../stores/store";
import { useMidiEditorContext } from "./providers/MidiEditorProvider.Context";
import { useMemo } from "react";
import { isEqual } from 'lodash'

export function Actions(props: { id: string }) {
    const { updateSong, getSongById } = useMidiEditorStore();
    const { song, resetSong } = useMidiEditorContext();

    const hasChange = useMemo(() => {
        return !isEqual(getSongById(props.id), song);
    }, [song, getSongById(props.id)])

    const handleSave = () => {
        updateSong(props.id, song!);
    }

    const handleReset = () => {
        resetSong();
    }

    return <>
        <div className="grid grid-cols-3 gap-2">
            <div className="hidden lg:block"></div>
            <div className="flex gap-2 justify-start lg:justify-center">
                {/* <Tooltip label="Play" withArrow>
                    <div className="p-1 bg-blue-500/50 flex justify-center items-center rounded-md cursor-pointer">
                        <IconPlayerPlay size={20} />
                    </div>
                </Tooltip> */}
                <Tooltip label="Pause" withArrow>
                    <div className="p-1 bg-blue-500/50 flex justify-center items-center rounded-md cursor-pointer">
                        <IconPlayerPause size={20} />
                    </div>
                </Tooltip>
                <Tooltip label="Reset" withArrow>
                    <div className="p-1 bg-yellow-500/50 flex justify-center items-center rounded-md cursor-pointer">
                        <IconRefreshDot size={20} />
                    </div>
                </Tooltip>
            </div>
            <div className="flex gap-2 justify-end col-span-2 lg:col-span-1">
                <Button size={'xs'} color={'yellow'} onClick={handleSave}>
                    <IconPlus className="lg:hidden inline-block" />
                    <span className="hidden lg:inline-block">Add Note</span>
                </Button>
                <Button size={'xs'} color={'orange'} onClick={handleSave}>
                    <IconList className="lg:hidden inline-block" />
                    <span className="hidden lg:inline-block">Note List</span>
                </Button>
                <Button size={'xs'} color={'green'} onClick={handleSave}>
                    <IconList className="lg:hidden inline-block" />
                    <span className="hidden lg:inline-block">Export</span>
                </Button>
                <Button disabled={!hasChange} size={'xs'} color={'blue'} onClick={handleSave}>
                    <IconDeviceFloppy className="lg:hidden inline-block" />
                    <span className="hidden lg:inline-block">Save</span>
                </Button>
                <Button disabled={!hasChange} size={'xs'} color={'red'} onClick={handleReset}>
                    <IconRestore className="lg:hidden inline-block" />
                    <span className="hidden lg:inline-block">Reset</span>
                </Button>
            </div>
        </div>
    </>
}