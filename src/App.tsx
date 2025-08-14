import { useState } from "react";
import Header from "./components/MainPageComponents/Header";
import PictureNet from "./components/MainPageComponents/PictureNet";
import InfoPage from "./components/MainPageComponents/InfoPage";
import Navbar from "./components/MainPageComponents/Navbar";
import PageTemplate from "./components/MainPageComponents/PageTemplate";
import Form from "./components/MovieComponents/movieForm";
import MovieContainer from "./components/MovieComponents/movieContainer";
import { TicTacToeAI } from "./components/TicTacToeComponents/TicTacToeAI";

interface Movie {
  name: string;
  grade: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const [movies, setMovies] = useState<Movie[]>([]);

  const addMovie = (name: string, grade: string) => {
    setMovies((movie) => [...movie, { name, grade }]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <>
            <InfoPage />
            <PictureNet />
          </>
        );
      case "ai":
        return (
          <PageTemplate
            title="AI Page"
            description="During my education, I had a particular focus on learning about artificial intelligence.
              In my third year at the university, we students had the opportunity to choose courses that we wanted to attend. Whit me picking both of the two AI related courses that were available. With one of them deepening my knowledge to develop AI in code and the other one deepening my knowledge on how and where AI can be used in our society. I also wrote my bachelor thesis regarding the use of ChatGPT and its impact on system developer students.                 
              "
            gradientFrom="from-blue-50"
            gradientTo="to-blue-100"
          >
            <div>
              <p className="text-lg text-gray-600 mb-6 font-mono">
                Below is one of my projects where I created an Othello AI using
                the Minimax algorithm with Alpha-Beta pruning and my AI focused
                bachelor thesis. There is also a TicTacToe game, where you play
                agains an AI computer. See if you can beat the AI!
              </p>
            </div>
            <div className="mt-4">
              <a
                href="https://github.com/Gefors/OthelloFX"
                className="text-blue-600 hover:text-blue-800 underline text-lg font-medium font-mono"
                target="_blank"
              >
                Othello AI
              </a>
            </div>
            <div className="mt-4 mb-10">
              <a
                href="https://mau.diva-portal.org/smash/record.jsf?dswid=-8690&pid=diva2%3A1964296&c=1&searchType=SIMPLE&language=sv&query=Teo+gefors&af=%5B%5D&aq=%5B%5B%5D%5D&aq2=%5B%5B%5D%5D&aqe=%5B%5D&noOfRows=50&sortOrder=author_sort_asc&sortOrder2=title_sort_asc&onlyFullText=false&sf=all"
                className="text-blue-600 hover:text-blue-800 underline text-lg font-medium font-mono"
                target="_blank"
              >
                ChatGPT’s impact on learning, problem-solving, and
                self-confidence – A study of system development students’
                perspectives
              </a>
            </div>
            <div>
              <p className="text-lg text-gray-600 font-mono">
                Here you can also find a TicTacToe game, where you play agains
                an AI computer. See if you can beat the AI!
              </p>
            </div>
            <TicTacToeAI />
          </PageTemplate>
        );
      case "API:s":
        return (
          <PageTemplate
            title="API:s Page"
            description="APIs have also been a significant part of my education, where I learned to integrate and use them in various projects."
            gradientFrom="from-orange-50"
            gradientTo="to-amber-100"
          >
            <div>
              <p className="text-lg text-gray-600 mb-6 font-mono">
                Below is one of my projects, called GymTime, that uses the
                OpenAI API to create tailored gym workouts for the user. The
                user can choose the length of the workout, which muscles to
                train, what equipment to use, and more...
              </p>
            </div>
            <div className="mt-4 pb-10">
              <a
                href="https://github.com/Gefors/Flerplattforms-projekt"
                className="text-blue-600 hover:text-blue-800 underline text-lg font-medium font-mono"
                target="_blank"
              >
                GymTime
              </a>
            </div>
            <div>
              <p className="text-lg text-gray-600 mb-6 font-mono">
                As movies is one of my hobbies. You can also try my movie API
                project below, where you can search for movies and save them to
                your list. The project uses the OMDb API to fetch movie data and
                the movies you save to your list are stored in the local storage
                of your browser. So even if you refresh or close the page, your
                saved movies will still be there!
              </p>
            </div>
            <div>
              <Form onAddMovie={addMovie} onMovieSaved={() => {}} />
              <MovieContainer />
            </div>
          </PageTemplate>
        );
      case "algorithms":
        return (
          <PageTemplate
            title="Algorithms Page"
            description="Here you can find some of my algorithm projects that I have worked on during my education. These projects showcase various algorithms and their implementations."
            gradientFrom="from-green-50"
            gradientTo="to-emerald-100"
          >
            <div className="mt-4">
              <a
                href="https://github.com/Gefors/TheKnapsackProblem"
                className="text-blue-600 hover:text-blue-800 underline text-lg font-medium font-mono"
                target="_blank"
              >
                The Knapsack Problem
              </a>
            </div>
            <div className="mt-4">
              <a
                href="https://github.com/Gefors/SortingAlgorithms"
                className="text-blue-600 hover:text-blue-800 underline text-lg font-medium font-mono"
                target="_blank"
              >
                A Collection Of Sorting Algorithms
              </a>
            </div>
            <div className="mt-4">
              <a
                href="https://github.com/Gefors/WordChain"
                className="text-blue-600 hover:text-blue-800 underline text-lg font-medium font-mono"
                target="_blank"
              >
                Word Chain Algorithm
              </a>
            </div>
            <div className="mt-4">
              <a
                href="https://github.com/Gefors/AlgorithmAnalysis"
                className="text-blue-600 hover:text-blue-800 underline text-lg font-medium font-mono"
                target="_blank"
              >
                Algorithm Analysis Project
              </a>
            </div>
          </PageTemplate>
        );
      case "contact":
        return (
          <PageTemplate
            title="Contact Page"
            description="If you want to get in touch, please reach out to me via email at:"
            gradientFrom="from-purple-50"
            gradientTo="to-pink-100"
          >
            <div className="mt-4">
              <a
                href="mailto:teogefors@live.se"
                className="text-blue-600 hover:text-blue-800 underline text-lg font-medium font-mono"
                target="_blank"
              >
                teogefors@live.se
              </a>
            </div>
            <div className="mt-4">
              <p className="text-lg text-gray-600 mb-6 font-mono">
                Or contact me via my LinkedIn page:
              </p>
              <a
                href="https://www.linkedin.com/in/teo-gefors-91a982354/"
                className="text-blue-600 hover:text-blue-800 underline text-lg font-medium font-mono"
                target="_blank"
              >
                LinkedIn Profile
              </a>
            </div>
            <div className="mt-4">
              <p className="text-lg text-gray-600 mb-6 font-mono">
                Or check out my GitHub profile for more projects:
              </p>
              <a
                href="https://github.com/Gefors"
                className="text-blue-600 hover:text-blue-800 underline text-lg font-medium font-mono"
                target="_blank"
              >
                Github
              </a>
            </div>
          </PageTemplate>
        );
      default:
        return (
          <PageTemplate
            title="Page Not Found"
            description="The page you're looking for doesn't exist."
            gradientFrom="from-gray-50"
            gradientTo="to-gray-100"
          />
        );
    }
  };

  return (
    <>
      <Header />
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
    </>
  );
}

export default App;
