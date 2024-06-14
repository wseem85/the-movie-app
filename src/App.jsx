import Home from "./pages/Home";
import Error from "./pages/Error";
import WatchedMovies from "./pages/WatchedMovies";
import MoviesToWatch from "./pages/MoviesToWatch";
import About from "./pages/About";
import AppLayout from "./ui/AppLayout";
import MoviePage, { loader as movieLoader } from "./ui/MoviePage";
import SeriesPage, { loader as seriesLoader } from "./ui/SeriesPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/movie/:id", element: <MoviePage />, loader: movieLoader },
      { path: "/series/:id", element: <SeriesPage />, loader: seriesLoader },
      { path: "/watched", element: <WatchedMovies /> },
      { path: "/towatch", element: <MoviesToWatch /> },
      { path: "/about", element: <About /> },
    ],
  },
]);
function App() {
  return (
    <RouterProvider router={router}>
      <AppLayout />
    </RouterProvider>
  );
}

export default App;
