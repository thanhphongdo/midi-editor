import {
  Button,
  Group,
  Modal,
  Stack,
  TextInput,
  Select,
  ColorInput,
  NumberInput,
  Title,
  Alert,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { useMidiEditorContext } from "./providers/MidiEditorProvider.Context";
import { Note, TrackTitle } from "../../definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { uniqBy } from "lodash";

const schema = z.object({
  track: z.string("Track is required").min(1, "Track is required"),
  time: z.number().min(0, "Time must be >= 0"),
  title: z.string("Title is required").min(1, "Title is required"),
  description: z.string().optional(),
  color: z.string("Color is required").min(1, "Color is required"),
});

type FormValues = z.infer<typeof schema>;

export function EditNoteModal() {
  const {
    song,
    currentNote,
    editNoteModalOpened,
    addNote,
    updateNote,
    closeEditNoteModal,
    getTrackColor,
  } = useMidiEditorContext();

  const [duplicatedError, setDuplicatedError] = useState(false);

  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      track: undefined,
      time: 0,
      title: undefined,
      description: "",
      color: "#FFFFFF",
    },
  });

  useEffect(() => {
    if (!editNoteModalOpened) {
      return;
    }
    if (currentNote) {
      reset({
        track: song.trackLabels[currentNote.track - 1],
        time: currentNote.time,
        title: currentNote.title,
        description: currentNote.description,
        color: currentNote.color,
      });
      return;
    }
    if (!currentNote) {
      reset({
        track: undefined,
        time: 0,
        title: undefined,
        description: "",
        color: "#000000",
      });
      return;
    }
  }, [editNoteModalOpened, currentNote, song.trackLabels]);

  useEffect(() => {
    const selectedTrack = watch("track");
    if (selectedTrack) {
      setValue("title", selectedTrack);
      setValue("color", getTrackColor(selectedTrack));
      trigger(["title", "color"]);
    }
  }, [watch("track")]);

  useEffect(() => {
    setDuplicatedError(false);
  }, [watch("time"), watch("track")]);

  const onSubmit = (data: FormValues) => {
    const newNote: Note = {
      track: song.trackLabels.indexOf(data.track as TrackTitle) + 1,
      time: data.time,
      title: data.title as any,
      description: data.description,
      color: data.color,
    };
    let isDuplicateNote = song.notes.some(
      (note) => note.track === newNote.track && note.time === data.time
    );
    if (
      currentNote &&
      currentNote.track === newNote.track &&
      currentNote.time === data.time
    ) {
      isDuplicateNote = false;
    }
    setDuplicatedError(isDuplicateNote);
    if (isDuplicateNote) {
      return;
    }
    if (currentNote) {
      updateNote(currentNote, newNote);
    } else {
      addNote(newNote);
    }
    closeEditNoteModal();
  };

  return (
    <Modal
      opened={editNoteModalOpened}
      onClose={closeEditNoteModal}
      title={
        <Title order={4}>{currentNote ? "Update Note" : "Add New Note"}</Title>
      }
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          {duplicatedError && (
            <Alert color="red" py={4} px={12}>
              <span className="text-red-300">This Note is duplicated!</span>
            </Alert>
          )}
          <Select
            label="Track"
            data={uniqBy(
              song.trackLabels.map((label) => ({ value: label, label })),
              "label"
            )}
            value={watch("track")}
            onChange={(val) => {
              setValue("track", val ?? "");
              trigger("track");
            }}
            error={errors.track?.message}
          />

          <NumberInput
            label="Time (s)"
            min={0}
            value={watch("time")}
            step={0.5}
            onChange={(value) => {
              setValue("time", Number(value ?? 0));
              trigger("time");
            }}
            error={errors.time?.message}
          />

          <TextInput
            label="Title"
            placeholder="Enter title"
            value={watch("title")}
            onChange={(e) => {
              setValue("title", e.target.value);
              trigger("title");
            }}
            error={errors.title?.message}
          />

          <TextInput
            label="Description"
            placeholder="Enter description"
            value={watch("description")}
            onChange={(e) => setValue("description", e.target.value)}
            error={errors.description?.message}
          />

          <ColorInput
            label="Color"
            format="hex"
            swatches={song.trackLabels.map((track) => {
              return getTrackColor(track);
            })}
            value={watch("color")}
            onChange={(val) => {
              setValue("color", val);
              trigger("color");
            }}
            error={errors.color?.message}
          />

          <Group mt="md" justify="flex-end">
            <Button type="submit" color="blue">
              {currentNote ? "Update" : "Add"}
            </Button>
            <Button onClick={closeEditNoteModal} color="red">
              Cancel
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
