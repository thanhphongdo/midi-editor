import { useEffect } from "react";
import { useMidiEditorStore } from "../stores/store";

export function MainApp() {
  const { songs } = useMidiEditorStore();
  useEffect(() => {
    console.log(songs);
  }, [])
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full lg:w-2/3 xl:w-1/3">
        <div>XXX</div>
      </div>
      <div className="flex-1 w-full lg:w-5/6 xl:w-3/4 2xl:w-2/3">
        <div>YYY</div>
      </div>
    </div>
  );
}
