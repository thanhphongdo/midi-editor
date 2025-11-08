import { memo, useState } from "react";
import { TrackTitle, Note as NoteProps } from "../../../definitions";
import { useMidiEditorContext } from "../providers/MidiEditorProvider.Context";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconX } from "@tabler/icons-react";
import { Button, Group, Modal, Title } from "@mantine/core";
import { Note } from "./Note";

type TrackEleProps = {
  track: number;
  title: TrackTitle;
  notes: Array<NoteProps>;
  isAdding?: boolean;
  dragListeners?: any;
  dragAttributes?: any;
};

function TrackEle({
  track,
  title,
  notes,
  isAdding,
  dragListeners,
  dragAttributes,
}: TrackEleProps) {
  const { gridOptions, getTrackColor, openAddNewTrackModal, updateSong, song } =
    useMidiEditorContext();

  const [titleHover, setTitleHover] = useState(false);
  const [hintTime, setHintTime] = useState<number | null>(null);
  const [opened, { open, close }] = useDisclosure();

  const handleAddNewTrack = () => {
    if (!isAdding) return;
    openAddNewTrackModal();
  };

  const handleRemoveTrack = () => {
    close();
    const newTrackLabels = song.trackLabels.filter(
      (_, idx) => idx + 1 !== track
    );
    const newNotes = song.notes
      .filter((note) => note.track !== track)
      .map((note) => {
        if (note.track > track) {
          return { ...note, track: note.track - 1 };
        }
        return note;
      });

    const newSong = {
      ...song,
      trackLabels: newTrackLabels,
      notes: newNotes,
    };

    updateSong(newSong);
  };

  return (
    <>
      <div>
        <div
          className="h-8 flex items-end justify-center sticky top-0 bg-dark-1000 !text-white z-[15] font-bold cursor-grab select-none w-[calc(100%_+_0.5rem)] lg:w-[calc(100%_+_1rem)] pr-2 lg:pr-4 left-0"
          onClick={handleAddNewTrack}
          onMouseEnter={() => setTitleHover(true)}
          onMouseLeave={() => setTitleHover(false)}
        >
          <div
            className="w-full h-full text-sm flex justify-center items-end"
            {...(isAdding ? {} : { ...dragListeners, ...dragAttributes })}
          >
            {isAdding && <IconPlus size={16} className="mb-[2px] mx-1" />}
            {title}
          </div>
          {!isAdding && titleHover && (
            <div
              className="absolute top-3 right-3 lg:right-5 p-[2px] bg-red-500/60 hover:bg-red-500 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                open();
              }}
            >
              <IconX size={12} />
            </div>
          )}
        </div>
        <div
          className="flex justify-center relative mt-4"
          style={{
            width: gridOptions.trackWidth,
            height:
              (gridOptions.maxDuration + gridOptions.interval) *
              gridOptions.timeScalePer1s,
            background: getTrackColor(title, 0.1),
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            if (
              e.clientX - rect.left < gridOptions.trackWidth / 2 - 10 ||
              e.clientX - rect.left > gridOptions.trackWidth / 2 + 10
            ) {
              setHintTime(null);
              return;
            }
            setHintTime(
              Math.ceil(
                ((e.clientY - rect.top) * 2) / gridOptions.timeScalePer1s
              ) / 2
            );
          }}
          onMouseLeave={() => {
            setHintTime(null);
          }}
        >
          <div
            className="h-full border-l-2"
            style={{
              borderColor: getTrackColor(title, 0.3),
            }}
          ></div>
          {!isAdding && (
            <>
              {hintTime !== null && hintTime <= gridOptions.maxDuration && (
                <Note time={hintTime} title={title} track={track} isHint />
              )}
              {notes.map((note, index) => (
                <Note
                  key={note.time + "-" + note.track + "-" + index}
                  {...note}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <Modal
        opened={opened}
        onClose={close}
        title={<Title order={4}>Remove Track</Title>}
      >
        Are you sure you want to remove this track?
        <Group mt="lg" justify="flex-end">
          <Button onClick={handleRemoveTrack} color="blue">
            Confirm
          </Button>
          <Button onClick={close} color="red">
            Close
          </Button>
        </Group>
      </Modal>
    </>
  );
}

export const Track = memo(TrackEle);
