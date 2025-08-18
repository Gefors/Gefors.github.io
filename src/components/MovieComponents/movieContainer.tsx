import { useEffect, useState } from "react";
import { MovieList } from "./movieList";
import FunctionButtons from "./functionButton";

interface MovieWithRating {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  rating: number;
}

const MovieContainer = () => {
  const [movies, setMovies] = useState<MovieWithRating[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  void isLoading;

  const loadMoviesFromStorage = () => {
    try {
      const savedMovies = localStorage.getItem("ratedMoviesDetails");
      const savedRatings = localStorage.getItem("movieRatings");

      if (savedMovies && savedRatings) {
        const movieDetails = JSON.parse(savedMovies);
        const movieRatings = JSON.parse(savedRatings);

        const moviesWithRatings = Object.keys(movieDetails).map((movieId) => ({
          ...movieDetails[movieId],
          rating: movieRatings[movieId] || 0,
        }));

        setMovies(moviesWithRatings);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error loading movies from localStorage:", error);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const alphabetOrderMovies = () => {
    setMovies((prev) =>
      [...prev].sort((a, b) => a.Title.localeCompare(b.Title))
    );
  };

  const gradeOrderMovies = () => {
    setMovies((prev) => [...prev].sort((a, b) => b.rating - a.rating));
  };

  const buttons = [
    { label: "Alphabetical order", onClick: alphabetOrderMovies },
    { label: "Rating order", onClick: gradeOrderMovies },
  ];

  useEffect(() => {
    loadMoviesFromStorage();

    const handleMovieSaved = () => {
      loadMoviesFromStorage();
    };

    window.addEventListener("movieSaved", handleMovieSaved);

    return () => {
      window.removeEventListener("movieSaved", handleMovieSaved);
    };
  }, []);

  const handleDeleteMovie = (movieTitle: string) => {
    setMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.Title !== movieTitle)
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold font-mono text-gray-800 mb-6">
        Your Movie List ({movies.length})
      </h2>

      {movies.length > 0 && (
        <div className="mb-6">
          <FunctionButtons buttons={buttons} />
        </div>
      )}

      {movies.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM6 6v12h12V6H6zm3 3a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1zm0 3a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No saved movies
          </h3>
          <p className="text-gray-500">
            Add movies using the form above to see them here.
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {movies.map((movie) => (
            <MovieList
              key={movie.imdbID}
              name={movie.Title}
              grade={movie.rating.toString()}
              onClose={() => handleDeleteMovie(movie.Title)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieContainer;
