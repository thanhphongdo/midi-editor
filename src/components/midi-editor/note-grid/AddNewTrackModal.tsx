import { Button, Group, Modal, Select, Title } from "@mantine/core";
import { useMidiEditorContext } from "../providers/MidiEditorProvider.Context";
import { TrackTitle } from "../../../definitions";
import { useEffect, useState } from "react";

export function AddNewTrackModal() {

    const { closeAddNewTrackModal, addNewTrackModalOpened, updateSong, song } = useMidiEditorContext();
    const [track, setTrack] = useState<TrackTitle | null>(null);
    const handleConfirm = () => {
        if (!track) return;
        updateSong({
            ...song,
            trackLabels: [...song.trackLabels, track]
        });
        closeAddNewTrackModal();
    }

    useEffect(() => {
        setTrack(null);
    }, [addNewTrackModalOpened])

    return <Modal opened={addNewTrackModalOpened} onClose={closeAddNewTrackModal}
        title={<Title order={4}>New Track</Title>}
        centered>
        <div>
            <Select
                label="Select Track Type"
                placeholder="Pick value"
                value={track}
                data={[
                    TrackTitle.Arp,
                    TrackTitle.Bass,
                    TrackTitle.Crash,
                    TrackTitle.FX,
                    TrackTitle.HiHat,
                    TrackTitle.Kick,
                    TrackTitle.LeadSynth,
                    TrackTitle.Pad,
                    TrackTitle.Ride,
                    TrackTitle.Snare,
                    TrackTitle.Tambourine,
                    TrackTitle.Tom1,
                    TrackTitle.Tom2,
                ]}
                onChange={(value) => {
                    setTrack(value as TrackTitle);
                }}
            />
        </div>
        <Group mt="lg" justify="flex-end">
            <Button onClick={handleConfirm} color="blue">
                Confirm
            </Button>
            <Button onClick={closeAddNewTrackModal} color="red">
                Close
            </Button>
        </Group>
    </Modal>
}