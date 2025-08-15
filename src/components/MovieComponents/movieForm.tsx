import React, { useState, useCallback } from "react";
const key = import.meta.env.VITE_MOVIE_API_KEY;

type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

interface FormProps {
  onAddMovie: (name: string, grade: string) => void;
  onMovieSaved?: () => void;
}

export const Form = ({ onAddMovie, onMovieSaved }: FormProps) => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("0");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const searchMovies = useCallback(async (searchTerm: string) => {
    if (searchTerm.length < 3 || searchTerm.trim() === "") {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${key}&s=${encodeURIComponent(
          searchTerm
        )}`
      );
      const data = await response.json();

      if (data.Response === "True" && data.Search) {
        setSearchResults(data.Search.slice(0, 5));
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching movies:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    setSelectedMovie(null);
    searchMovies(value);
  };

  const selectMovie = (movie: Movie) => {
    setTitle(movie.Title);
    setSelectedMovie(movie);
    setSearchResults([]);
  };

  const saveToLocalStorage = (movie: Movie, rating: string) => {
    try {
      const savedRatings = localStorage.getItem("movieRatings");
      let ratings = {};
      if (savedRatings) {
        ratings = JSON.parse(savedRatings);
      }
      ratings = {
        ...ratings,
        [movie.imdbID]: parseInt(rating),
      };
      localStorage.setItem("movieRatings", JSON.stringify(ratings));

      const savedMovies = localStorage.getItem("ratedMoviesDetails");
      let movieDetails = {};
      if (savedMovies) {
        movieDetails = JSON.parse(savedMovies);
      }
      movieDetails = {
        ...movieDetails,
        [movie.imdbID]: movie,
      };
      localStorage.setItem("ratedMoviesDetails", JSON.stringify(movieDetails));

      console.log(
        "Movie saved to localStorage:",
        movie.Title,
        "Rating:",
        rating
      );

      window.dispatchEvent(
        new CustomEvent("movieSaved", {
          detail: { movie, rating },
        })
      );

      return true;
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title !== "" && rating !== "0") {
      if (selectedMovie) {
        saveToLocalStorage(selectedMovie, rating);
      }

      onAddMovie(title, rating);

      if (onMovieSaved) {
        onMovieSaved();
      }

      setTitle("");
      setRating("0");
      setSelectedMovie(null);
      setSearchResults([]);
    } else {
      alert("The title and rating fields must be filled out.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-amber-50 rounded-lg shadow-lg">
      <form id="add-movie-form" onSubmit={handleSubmit}>
        <fieldset className="border-0">
          <p className="text-4xl text-center font-bold font-mono text-gray-800 mb-6">
            IMDb 2.0
          </p>

          <div className="mb-4 relative">
            <label
              htmlFor="title-field"
              className="block text-sm font-medium text-gray-700 mb-2 font-mono"
            >
              Title:
            </label>
            <input
              value={title}
              onChange={handleTitleChange}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
              id="title-field"
              placeholder="Search for a movie..."
              autoComplete="off"
            />

            {isLoading && (
              <div className="absolute right-3 top-10">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              </div>
            )}

            {searchResults.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {searchResults.map((movie) => (
                  <div
                    key={movie.imdbID}
                    onClick={() => selectMovie(movie)}
                    className="flex items-center p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    {movie.Poster !== "N/A" ? (
                      <img
                        src={movie.Poster}
                        alt={`${movie.Title} poster`}
                        className="w-12 h-16 object-cover rounded mr-3 flex-shrink-0"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-12 h-16 bg-gray-200 rounded mr-3 flex-shrink-0 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-gray-400"
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
                    )}
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-900">
                        {movie.Title}
                      </h3>
                      <p className="text-sm text-gray-600">{movie.Year}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedMovie && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm text-green-700 font-mono">
                  Vald film: {selectedMovie.Title} ({selectedMovie.Year})
                </span>
              </div>
            </div>
          )}

          {title && !selectedMovie && title.length >= 3 && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-yellow-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <span className="text-sm text-yellow-700 font-mono">
                  Choose a movie from the search results or enter a valid title.
                </span>
              </div>
            </div>
          )}

          <div className="mb-6">
            <label
              htmlFor="rating-field"
              className="block text-sm font-medium text-gray-700 mb-2 font-mono"
            >
              Rating:
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
            >
              <option value="0">Choose your rating...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-3 ms-3 rounded-lg bg-blue-950 text-white px-4 py-2 hover:bg-blue-800 transition-colors duration-200 font-mono"
          >
            Save Movie
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Form;
