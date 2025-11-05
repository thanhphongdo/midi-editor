import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { SongEditor } from "./pages/SongEditor";

export const routes = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <Home /> },
      { path: "/song/:id", element: <SongEditor /> },
      { path: "/new-song", element: <SongEditor /> },
    ],
  },
]);