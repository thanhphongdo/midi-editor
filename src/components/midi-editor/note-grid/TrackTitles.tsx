import { useMidiEditorContext } from "../providers/MidiEditorProvider.Context";

export function TrackTitles() {
    const { gridOptions } = useMidiEditorContext();

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