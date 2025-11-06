import { Button, Group, Modal, Title } from "@mantine/core";
import { Layout } from "../components/layouts/Layout";
import { SongList } from "../components/song/SongList";
import { IconFileImport, IconPlus } from "@tabler/icons-react";
import { useMidiEditorStore } from "../stores/store";
import { v4 } from "uuid";
import { useNavigate } from "react-router";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Song } from "../definitions";

export const Home = () => {
    const navigate = useNavigate();
    const { addSong, overwriteSong, getSongById, songs } = useMidiEditorStore();
    const [opened, { open, close }] = useDisclosure();
    const [jsonSong, setJsonSong] = useState<Song | null>(null);

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

    const isDuplicateSong = (id: string) => {
        return !!getSongById(id);
    }

    const handleImport = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "application/json";
        input.style.display = "none";

        input.onchange = (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target?.result as string);
                    if (!isDuplicateSong(json.id)) {
                        addSong(json);
                        return;
                    }
                    open();
                    setJsonSong(json);
                } catch (error) {
                    console.error("Invalid JSON file:", error);
                    alert("File không hợp lệ, vui lòng chọn lại!");
                }
            };

            reader.readAsText(file);
        };
        document.body.appendChild(input);
        input.click();
        input.remove();
    };

    const handleOverwriteSong = () => {
        if (!jsonSong) return;
        overwriteSong(jsonSong);
        close();
    }

    const handleKeepBoth = () => {
        if (!jsonSong) return;
        addSong({
            ...jsonSong,
            id: v4(),
            name: jsonSong.name + " (copy)",
        });
        close();
    }

    return <Layout>
        <div className="flex flex-col gap-4">
            <div className="flex justify-between">
                <Title order={3}>Your Songs {songs.length}</Title>
                <div className="flex gap-2 md:gap-4">
                    <Button size="xs" leftSection={<IconPlus />} onClick={handleAddSong}>Add New Song</Button>
                    <Button size="xs" color="green" leftSection={<IconFileImport />} onClick={handleImport}>Import</Button>
                </div>
            </div>
            <SongList />
            <Modal opened={opened} onClose={close}
                title={<Title order={4}>Import Song</Title>}>
                This song already exists. Do you want to overwrite it?
                <Group mt="lg" justify="flex-end">
                    <Button color="blue" onClick={handleOverwriteSong}>
                        Overwrite Song
                    </Button>
                    <Button color="green" onClick={handleKeepBoth}>
                        Keep both
                    </Button>
                    <Button onClick={close} color="red">
                        Close
                    </Button>
                </Group>
            </Modal>
        </div>
    </Layout>;
}