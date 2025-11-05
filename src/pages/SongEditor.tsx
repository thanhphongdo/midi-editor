import { useParams } from "react-router";
import { Layout } from "../components/layouts/Layout";
import { MidiEditor } from "../components/midi-editor/MidiEditor";
import { useMidiEditorStore } from "../stores/store";
import { useEffect } from "react";

export const SongEditor = () => {
    const params = useParams<{ id: string }>();
    const { getSongById, setIsEditing } = useMidiEditorStore();
    useEffect(() => {
        setIsEditing(false);
    }, []);
    const song = getSongById(params.id!);
    // const draftSong = getDraftSongById(params.id!);
    return <Layout>
        <div className="h-[calc(100vh_-_9.5rem)]">
            {!!song && <MidiEditor {...song} />}
        </div>
    </Layout>;
}