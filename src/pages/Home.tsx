import { Button, Title } from "@mantine/core";
import { Layout } from "../components/layouts/Layout";
import { SongList } from "../components/song/SongList";
import { IconFileImport, IconPlus } from "@tabler/icons-react";
import { useMidiEditorStore } from "../stores/store";
import { v4 } from "uuid";
import { useNavigate } from "react-router";

export const Home = () => {
    const navigate = useNavigate();
    const { addSong } = useMidiEditorStore();
    const handleAddSong = () => {
        const id = v4();
        addSong({
            id,
            name: '',
            description: '',
            totalDuration: 0,
            trackLabels: [],
            notes: []
        });
        navigate(`/song/${id}`);
    }

    return <Layout>
        <div className="flex flex-col gap-4">
            <div className="flex justify-between">
                <Title order={3}>Your Songs</Title>
                <div className="flex gap-2 md:gap-4">
                    <Button size="xs" leftSection={<IconPlus />} onClick={handleAddSong}>Add New Song</Button>
                    <Button size="xs" color="green" leftSection={<IconFileImport />}>Import</Button>
                </div>
            </div>
            <SongList />
        </div>
    </Layout>;
}