import MovieCarousel from "@/components/CarouselMovie";
import MovieList from "@/components/MovieList";

import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
  return (
    <div>
      <MovieCarousel />
      <MovieList />
    </div>
  );
}
