import { Button, Group, Modal, TagsInput, Title } from "@mantine/core";
import { useMidiEditorContext } from "./providers/MidiEditorProvider.Context";
import { useState } from "react";

export function SongTagsModal() {
  const { song, tagsModalOpened, updateSong, closeTagsModal } =
    useMidiEditorContext();

  const [tags, setTags] = useState<string[]>(song.tags ?? []);

  const handleEditTags = () => {
    updateSong({ tags }, true);
    closeTagsModal();
  };

  return (
    <Modal
      opened={tagsModalOpened}
      onClose={closeTagsModal}
      title={<Title order={4}>New Track</Title>}
    >
      <div>
        <TagsInput
          placeholder="Input the tags here"
          value={tags ?? []}
          max={10}
          onChange={(values) => {
            setTags(values);
          }}
          styles={{
            root: {
              border: "none",
              background: "transparent",
              color: "red",
            },
          }}
        />
      </div>
      <Group mt="lg" justify="flex-end">
        <Button onClick={handleEditTags} color="blue">
          Save
        </Button>
        <Button onClick={closeTagsModal} color="red">
          Cancel
        </Button>
      </Group>
    </Modal>
  );
}
