import { Title } from "@mantine/core";
import { useMidiEditorStore } from "../../stores/store";
import { useEffect, useState } from "react";

export function SongTitle(props: { id: string }) {
    const { isEditing, getSongById, getDraftSongById, updateDraftSong } = useMidiEditorStore();
    const [title, setTitle] = useState(getSongById(props.id)?.name || '');

    useEffect(() => {
        if (isEditing) {
            const draftSong = getDraftSongById(props.id);
            setTitle(draftSong?.name || '');
        } else {
            const song = getSongById(props.id);
            setTitle(song?.name || '');
        }
    }, [
        isEditing
    ]);

    const handleEditTitle = (value: string) => {
        if (!isEditing) return;
        setTitle(value);
        updateDraftSong(props.id, { name: value });
    }

    return <Title order={3} className="mb-4 w-full flex flex-col items-center">
        <input type="text"
            disabled={!isEditing}
            className={
                ['bg-transparent w-full outline-none',
                    !!title ? '' : 'italic'
                ].join(' ')
            }
            placeholder="Input the song name here"
            value={title} onChange={(el) => handleEditTitle(el.target.value)} />
    </Title>;
}