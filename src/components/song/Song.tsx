import { ActionIcon, Button, Group, Modal, Title } from "@mantine/core";
import { Song as SongProp } from "../../definitions";
import { useNavigate } from "react-router";
import { IconTrash } from "@tabler/icons-react";
import { useMidiEditorStore } from "../../stores/store";
import { useDisclosure } from "@mantine/hooks";

export function Song(props: SongProp) {
  const navigate = useNavigate();
  const { removeSong } = useMidiEditorStore();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <div
        className="flex flex-col gap-2 border p-4 rounded-md cursor-pointer relative"
        onClick={() => {
          navigate(`/song/${props.id}`);
        }}
      >
        <div className="absolute top-2 right-2">
          <ActionIcon
            color="red"
            onClick={(event) => {
              event.stopPropagation();
              open();
            }}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </div>
        <Title order={2}>{props.name || "No Name"}</Title>
        <Title order={4} className="italic">
          {props.description || "No Description"}
        </Title>
        <Title order={4}>Duration: {props.totalDuration} seconds</Title>
      </div>
      <Modal
        opened={opened}
        onClose={close}
        title={<Title order={4}>Remove Song</Title>}
      >
        Are you sure you want to remove this song?
        <Group mt="lg" justify="flex-end">
          <Button onClick={() => removeSong(props.id)} color="blue">
            Delete
          </Button>
          <Button onClick={close} color="red">
            Close
          </Button>
        </Group>
      </Modal>
    </>
  );
}
