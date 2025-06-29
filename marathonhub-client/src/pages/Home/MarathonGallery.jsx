import React from "react";

const MarathonGallery = () => {
  const images = [
    "https://i.ibb.co/8DKHR8NP/img-1.jpg",
    "https://i.ibb.co/1fsWkC3T/img-2.jpg",
    "https://i.ibb.co/QjbQgx01/img-3.jpg",
    "https://i.ibb.co/VpLQ8gM7/img-4.jpg",
    "https://i.ibb.co/s9Ztr0nr/img-5.jpg",
    "https://i.ibb.co/4gXcnwcF/img-6.jpg",
  ];

  return (
    <section className="bg-surfaceColor text-text border border-border  px-6 py-12 my-12  shadow-md transition-colors duration-300">
      <div className="w-11/12 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold mb-3">
            Marathon Photo Gallery
          </h2>
          <p className="text-muted-text">
            A glimpse into the energy, spirit, and moments from our past
            marathons.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-lg shadow hover:scale-105 transition-transform duration-300"
            >
              <img
                src={img}
                alt={`Marathon highlight ${idx + 1}`}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarathonGallery;
