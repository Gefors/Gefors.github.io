import { useEffect, useState } from "react";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  rating: number;
}

interface MovieListProps {
  name: string;
  grade: string;
  onClose: () => void;
}

export const MovieList = ({ name, grade, onClose }: MovieListProps) => {
  const [movieData, setMovieData] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  void isLoading;

  useEffect(() => {
    const loadMovieData = () => {
      try {
        const savedMovies = localStorage.getItem("ratedMoviesDetails");

        if (savedMovies) {
          const movieDetails = JSON.parse(savedMovies);

          const foundMovie = Object.values(movieDetails).find(
            (movie: any) => movie.Title === name
          ) as Movie;

          if (foundMovie) {
            setMovieData({
              ...foundMovie,
              rating: parseInt(grade),
            });
          } else {
            setMovieData({
              imdbID: `manual-${Date.now()}`,
              Title: name,
              Year: "",
              Poster: "N/A",
              rating: parseInt(grade),
            });
          }
        } else {
          setMovieData({
            imdbID: `manual-${Date.now()}`,
            Title: name,
            Year: "",
            Poster: "N/A",
            rating: parseInt(grade),
          });
        }
      } catch (error) {
        console.error("Error loading movie data:", error);
        setMovieData({
          imdbID: `manual-${Date.now()}`,
          Title: name,
          Year: "",
          Poster: "N/A",
          rating: parseInt(grade),
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadMovieData();
  }, [name, grade]);

  const handleDelete = () => {
    if (movieData) {
      try {
        const savedMovies = localStorage.getItem("ratedMoviesDetails");
        const ratings = localStorage.getItem("movieRatings");

        if (savedMovies && ratings) {
          const movieDetails = JSON.parse(savedMovies);
          const movieRatings = JSON.parse(ratings);

          const movieId = Object.keys(movieDetails).find(
            (id) => movieDetails[id].Title === name || id === movieData.imdbID
          );

          if (movieId) {
            delete movieDetails[movieId];
            delete movieRatings[movieId];

            localStorage.setItem(
              "ratedMoviesDetails",
              JSON.stringify(movieDetails)
            );
            localStorage.setItem("movieRatings", JSON.stringify(movieRatings));
          }
        }
      } catch (error) {
        console.error("Error removing movie from localStorage:", error);
      }
    }

    onClose();
  };

  const renderStars = (rating: number) => {
    return [...Array(Math.min(rating, 10))].map((_, idx) => (
      <span
        key={`star-${movieData?.imdbID ?? name}-${idx}`}
        className="text-yellow-400 text-lg"
      >
        ⭐
      </span>
    ));
  };

  return (
    <li
      data-grade={grade}
      data-title={name}
      className="bg-amber-50 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {movieData?.Poster && movieData.Poster !== "N/A" ? (
            <img
              src={movieData.Poster}
              alt={`${movieData.Title} poster`}
              className="w-16 h-24 object-cover rounded-md shadow-sm"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const placeholder = e.currentTarget
                  .nextElementSibling as HTMLElement;
                if (placeholder) {
                  placeholder.style.display = "flex";
                }
              }}
            />
          ) : null}

          <div
            className={`w-16 h-24 bg-gray-200 rounded-md shadow-sm flex items-center justify-center ${
              movieData?.Poster && movieData.Poster !== "N/A"
                ? "hidden"
                : "flex"
            }`}
          >
            <svg
              className="w-8 h-8 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="flex-1 min-w-0 bg-amber-50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-mono font-semibold text-gray-900 truncate">
                {name}
              </h3>
              {movieData?.Year && (
                <p className="text-sm text-gray-600 mb-2">{movieData.Year}</p>
              )}

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium font-mono text-gray-700">
                  Betyg:
                </span>
                <div className="flex items-center space-x-1">
                  {renderStars(parseInt(grade))}
                  <span className="text-sm font-mono text-gray-600 ml-2">
                    {grade}/10
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDelete}
              aria-label="Delete movie"
              className="flex-shrink-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default MovieList;
