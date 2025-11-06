import { YAxis } from "./YAxis";
import { Tracks } from "./Tracks";

export function NoteGrid() {

    return <div className=" w-full h-full flex flex-col border-2 border-red-400/40 rounded-md">
        <div className="overflow-auto relative flex gap-2 md:gap-4 bg-dark-1000 rounded-md">
            <div className="w-16 sticky h-auto left-0 z-20 pt-12">
                <div className="w-16 h-12 absolute top-0 left-0 bg-dark-1000"></div>
                <YAxis />
            </div>
            <Tracks />
        </div>
    </div>
}