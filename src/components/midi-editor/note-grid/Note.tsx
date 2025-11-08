import { memo, useState } from "react";
import { Note as NoteProps } from "../../../definitions";
import { useMidiEditorContext } from "../providers/MidiEditorProvider.Context";

function NoteEle(props: Partial<NoteProps> & { isHint?: boolean }) {
  const { gridOptions, getTrackColor, addNote, deleteNote, player } =
    useMidiEditorContext();
  const [focused, setFocused] = useState(false);
  const handleToggleNote = () => {
    if (props.isHint) {
      addNote({
        track: props.track!,
        time: props.time!,
        title: props.title!,
        description: "",
        color: getTrackColor(props.title!),
      });
    } else {
      deleteNote({
        track: props.track!,
        time: props.time!,
      });
    }
  };

  const isPlaying = player.state === "PLAYING" && player.time === props.time!;

  return (
    <>
      <div
        className="absolute z-10 w-3 h-3 flex justify-center items-center cursor-pointer rounded-full"
        style={{
          top: props.time! * gridOptions.timeScalePer1s - 6,
          background: isPlaying
            ? props.color ?? getTrackColor(props.title!, 0.7)
            : focused
            ? props.color ?? getTrackColor(props.title!, 0.7)
            : "",
          transition: "background-color 0.5s ease",
        }}
        onMouseEnter={() => {
          setFocused(true);
        }}
        onMouseLeave={() => {
          setFocused(false);
        }}
        onClick={handleToggleNote}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{
            background: props.isHint
              ? getTrackColor(props.title!, 0.3)
              : props.color ?? getTrackColor(props.title!),
          }}
        ></div>
        {focused && (
          <div className="absolute left-4 text-sm rounded-sm font-bold bg-white text-dark-1000 px-1">
            {props.time}s
          </div>
        )}
      </div>
    </>
  );
}

export const Note = memo(NoteEle);
