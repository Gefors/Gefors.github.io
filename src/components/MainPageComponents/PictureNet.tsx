import { useState } from "react";
import PictureTwo from "../../assets/wololo.jpg";

function PictureNet() {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    index: number;
  } | null>(null);

  const pictures = [
    {
      id: "memory-1",
      src: PictureTwo,
      alt: "Couple at engagement party",
    },
    {
      id: "memory-2",
      src: PictureTwo,
      alt: "First dance rehearsal",
    },
    {
      id: "memory-3",
      src: PictureTwo,
      alt: "Romantic dinner date",
    },
    {
      id: "memory-4",
      src: PictureTwo,
      alt: "Walking on the beach",
    },
    {
      id: "memory-5",
      src: "https://via.placeholder.com/400x300/f3f4f6/6b7280?text=Wedding+Photo+5",
      alt: "Celebrating with family",
    },
    {
      id: "memory-6",
      src: "https://via.placeholder.com/400x300/f3f4f6/6b7280?text=Wedding+Photo+6",
      alt: "Ring exchange moment",
    },
  ];

  const openModal = (picture: (typeof pictures)[0], index: number) => {
    setSelectedImage({
      src: picture.src,
      alt: picture.alt,
      index: index,
    });
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedImage) return;

    let newIndex;
    if (direction === "prev") {
      newIndex =
        selectedImage.index > 0 ? selectedImage.index - 1 : pictures.length - 1;
    } else {
      newIndex =
        selectedImage.index < pictures.length - 1 ? selectedImage.index + 1 : 0;
    }

    setSelectedImage({
      src: pictures[newIndex].src,
      alt: pictures[newIndex].alt,
      index: newIndex,
    });
  };

  return (
    <div className="py-12 px-4 bg-blue-950">
      <h2 className="text-4xl font-mono font-bold text-center mb-8 text-white">
        Some Pictures
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pictures.map((picture, index) => (
          <button
            key={picture.id}
            className="group relative bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-purple-300"
            onClick={() => openModal(picture, index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openModal(picture, index);
              }
            }}
            aria-label={`View larger image: ${picture.alt}`}
          >
            {/* Decorative frame */}
            <div className="relative overflow-hidden rounded-md">
              <img
                src={picture.src}
                alt={picture.alt}
                className="w-full h-64 object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
              />
              {/* Frame overlay */}
              <div className="absolute inset-0 border-4 border-white rounded-md shadow-inner pointer-events-none"></div>
              {/* Click indicator */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center rounded-md">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full p-2">
                  <svg
                    className="w-6 h-6 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {/* Optional caption */}
            <p className="text-center text-gray-600 mt-3 text-sm font-medium">
              Memory {index + 1}
            </p>
          </button>
        ))}
      </div>

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200"
              aria-label="Close image"
            >
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Navigation arrows */}
            <button
              onClick={() => navigateImage("prev")}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200"
              aria-label="Previous image"
            >
              <svg
                className="w-6 h-6 text-gray-800"
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
              onClick={() => navigateImage("next")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200"
              aria-label="Next image"
            >
              <svg
                className="w-6 h-6 text-gray-800"
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

            {/* Enlarged image */}
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
              {selectedImage.index + 1} of {pictures.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PictureNet;
