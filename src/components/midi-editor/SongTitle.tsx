import { Title } from "@mantine/core";
import { useMidiEditorContext } from "./providers/MidiEditorProvider.Context";

export function SongTitle() {

    const handleEditTitle = (value: string) => {
        updateSong({ name: value });
    }

    const { isEditing, updateSong, song: { name } } = useMidiEditorContext();

    return <Title order={3} className="mb-4 w-full flex flex-col items-center">
        <input type="text"
            disabled={!isEditing}
            className={
                ['bg-transparent w-full outline-none',
                    !!name ? '' : 'italic'
                ].join(' ')
            }
            placeholder="Input the song name here"
            value={name} onChange={(el) => handleEditTitle(el.target.value)} />
    </Title>;
}