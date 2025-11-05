import { Layout } from "../components/layouts/Layout";
import { SongList } from "../components/song/SongList";

export const Home = () => {
    return <Layout>
        <div>
            <SongList />
        </div>
    </Layout>;
}