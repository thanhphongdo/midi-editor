import { useSortable } from "@dnd-kit/sortable";
import { Track } from "./Track";
import { TrackTitle } from "../../../definitions";
import { CSS } from "@dnd-kit/utilities";

export function SortableTrack({
  id,
  ...props
}: {
  id: string;
  track: number;
  title: TrackTitle;
  notes: any[];
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Track {...props} dragListeners={listeners} dragAttributes={attributes} />
    </div>
  );
}
