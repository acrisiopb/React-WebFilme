import MovieCarousel from "@/components/Carousel/insex";
import MovieList from "@/components/MovieList";
import SeriesList from "@/components/SeriesList/Index";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
  return (
    <div>
      <MovieCarousel />
      <MovieList />
      <SeriesList/>
    </div>
  );
}
