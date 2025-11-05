import { Button, Group, Modal, Title } from "@mantine/core";
import { IconCancel, IconDeviceFloppy, IconPencil } from "@tabler/icons-react";
import { useMidiEditorStore } from "../../stores/store";
import { useDisclosure } from "@mantine/hooks";

export function Actions(props: { id: string }) {
    const { isEditing, getSongById, getDraftSongById, updateSong, addDraftSong, removeDraftSong, setIsEditing } = useMidiEditorStore();
    const [opened, { open, close }] = useDisclosure(false);

    const handleEdit = () => {
        console.log(props.id)
        console.log(getDraftSongById(props.id))
        if (getDraftSongById(props.id)) {
            open();
            return;
        }
        handleEditOnOriginal();
    }

    const handleEditOnDraft = () => {
        close();
        setIsEditing(true);
    }

    const handleEditOnOriginal = () => {
        close();
        removeDraftSong(props.id);
        addDraftSong(getSongById(props.id)!);
        setIsEditing(true);
    }

    const handleSave = () => {
        const draftSong = getDraftSongById(props.id);
        removeDraftSong(props.id);
        updateSong(props.id, draftSong!);
        setIsEditing(false);
    }

    const handleCancel = () => {
        removeDraftSong(props.id);
        setIsEditing(false);
    }

    return <>
        <div className="flex gap-2">
            {!isEditing && <Button size={'sm'} color={'yellow'} leftSection={<IconPencil />} onClick={handleEdit}>Edit</Button>}
            {isEditing && <Button size={'sm'} color={'blue'} leftSection={<IconDeviceFloppy />} onClick={handleSave}>Save</Button>}
            {isEditing && <Button size={'sm'} color={'red'} leftSection={<IconCancel />} onClick={handleCancel}>Cancel</Button>}
        </div>
        <Modal opened={opened} onClose={close} title={<Title order={4}>Edit Song</Title>}>
            You have a draft version of this song. Would you like to continue editing the draft version or start editing the original version?
            <Group mt="lg" justify="flex-end">
                <Button onClick={handleEditOnDraft} color="blue">
                    Edit on Draft
                </Button>
                <Button onClick={handleEditOnOriginal} color='green'>
                    Edit on Original
                </Button>
            </Group>
        </Modal>
    </>
}