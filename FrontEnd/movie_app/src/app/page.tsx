import MovieCarousel from "@/components/Carousel/insex";
import MovieList from "@/components/MovieList";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
  return (
    <div>
      <MovieCarousel />
      <MovieList />
    </div>
  );
}
