import { Title } from "@mantine/core";
import { Song as SongProp } from "../../definitions";
import { useNavigate } from "react-router";

export function Song(props: SongProp) {
    const navigate = useNavigate();
    return <div className="flex flex-col gap-2 border p-4 rounded-md cursor-pointer" onClick={() => {
        navigate(`/song/${props.id}`);
    }}>
        <Title order={2}>{props.name}</Title>
        <Title order={4}>{props.description}</Title>
        <Title order={4}>Duration: {props.totalDuration} seconds</Title>
    </div>
}