import { useState } from "react";

function InfoPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: "background",
      title: "Background",
      content:
        "I am a newly graduated system developer, who is driven and ready to start my professional career. I am 27 years old and based in Sweden in a town called Lund, where I live with my girlfriend and our dog Walter (a picture of Walter can be found below).",
    },
    {
      id: "education",
      title: "Education",
      content:
        "I recently graduated as a System Developer from Malmö University after three years of study. My education focused primarily on object-oriented programming in Java and database development with PostgreSQL. I also have experience working with C#/.NET, Python, REST API:s, Git, and web development. I am comfortable working in teams and have participated in numerous projects that applied agile methodologies, such as Scrum, during my time at the University. Additionally, I have completed a separate Python course to further develop my programming skills.",
    },
    {
      id: "webDevelopment",
      title: "Web Development",
      content:
        "Even though I have a background as a System Developer, I have developed a strong interest in web development. I have worked with various web development languages, such as, TypeScript, JavaScript, HTML and CSS. Additionally, I have knowledge in using libraries and framework, such as, React, Bootstrap, Node, JQuery and Tailwindcss. With my favorite combination being React, TypeScript and Tailwindcss. Which I have used to create this website!",
    },
    {
      id: "hobbies",
      title: "Hobbys & Interests",
      content:
        "I am a very active person who enjoys going to the gym several times a week. I also have a passion for movies and music, and enjoy listening to new and different music genres that I wouldn't normally listen to. As this is how I discovered some of my favorite artists / bands, like: Radiohead, Kent, Black Country,New Road and Ludovico Einaudi. If you haven't already, I highly recommend giving them a listen!",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="py-12 px-4 bg-indigo-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold font-mono text-center mb-8 text-gray-800">
          Information about me
        </h2>

        <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="relative h-96 flex items-center justify-center p-8">
            <div className="text-center p-10 max-w-2xl">
              <h3 className="text-3xl font-bold font-mono mb-6 text-gray-800">
                {slides[currentSlide].title}
              </h3>
              <p className="text-lg font-mono leading-relaxed text-gray-600">
                {slides[currentSlide].content}
              </p>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 bg-blue-950 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
              aria-label="Previous slide"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 bg-blue-950 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
              aria-label="Next slide"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="flex justify-center space-x-2 p-6 bg-blue-950">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide
                    ? "bg-sky-200 scale-125"
                    : "bg-white hover:bg-orange-100"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-4 font-mono text-gray-600">
          {currentSlide + 1} of {slides.length}
        </div>
      </div>
    </div>
  );
}

export default InfoPage;
