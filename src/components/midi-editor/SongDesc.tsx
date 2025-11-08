import { Title } from "@mantine/core";
import { useMidiEditorContext } from "./providers/MidiEditorProvider.Context";

export function SongDesc() {
  const handleEditTitle = (value: string) => {
    updateSong({ description: value });
  };
  const {
    updateSong,
    song: { description },
  } = useMidiEditorContext();

  return (
    <Title order={4} className="mb-4 w-full flex flex-col items-center">
      <input
        type="text"
        className="bg-transparent w-full outline-none italic"
        placeholder="Input the song description here"
        value={description}
        onChange={(el) => handleEditTitle(el.target.value)}
      />
    </Title>
  );
}
