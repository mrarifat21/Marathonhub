import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const staticMarathons = [
  {
    title: "Sunset Sprint Challenge",
    location: "Cox's Bazar",
    imageURL: "https://i.ibb.co/1fsWkC3T/img-2.jpg"
  },
  {
    title: "Hilltop Hustle",
    location: "Bandarban",
    imageURL: "https://i.ibb.co/8DKHR8NP/img-1.jpg"
  },
  {
    title: "City Lights Marathon",
    location: "Dhaka",
    imageURL: "https://i.ibb.co/VpLQ8gM7/img-4.jpg"
  },
  {
    title: "Riverside Run",
    location: "Rajshahi Riverside Park",
    imageURL: "https://i.ibb.co/QjbQgx01/img-3.jpg"
  },
  {
    title: "Midnight Glow Marathon",
    location: "Chittagong City",
    imageURL: "https://i.ibb.co/1fsWkC3T/img-2.jpg"
  },
  {
    title: "Heritage Run",
    location: "Sonargaon",
    imageURL: "https://i.ibb.co/8DKHR8NP/img-1.jpg"
  },
];

const getDateString = (date) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return `${month}/${day}/${year}`;
};

const UpcomingMarathons = () => {
  const [marathons, setMarathons] = useState([]);

  useEffect(() => {
    const today = new Date();

    const marathonsWithDates = staticMarathons.map((m, i) => {
      const startRegistrationDate = new Date(today);
      startRegistrationDate.setDate(today.getDate() + 10 + i);
      const endRegistrationDate = new Date(today);
      endRegistrationDate.setDate(today.getDate() + 15 + i);
      const marathonStartDate = new Date(today);
      marathonStartDate.setDate(today.getDate() + 20 + i);

      return {
        ...m,
        startRegistrationDate: getDateString(startRegistrationDate),
        endRegistrationDate: getDateString(endRegistrationDate),
        marathonStartDate: getDateString(marathonStartDate),
      };
    });

    setMarathons(marathonsWithDates.slice(0,6));
  }, []);

  const handleRegister = () => {
    Swal.fire({
      icon: "success",
      title: "Registration has not started yet.",
    });
  };

  return (
    <section
      className="bg-background"
    >
    <div className="py-12 px-6 w-11/12 mx-auto">
        <h2
        className="text-3xl font-bold text-center mb-10 text-text"
      >
        Upcoming Marathons
      </h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {marathons.map((marathon, index) => (
          <div
            key={index}
            className="flex flex-col rounded-lg shadow-sm overflow-hidden bg-surfaceColor border-l-4 border-highlight transition hover:shadow-2xl">
            <img
              src={marathon.imageURL}
              alt={marathon.title}
              className="h-44 w-full object-cover"
            />
            <div
              className="p-5 flex flex-col flex-grow text-text"
            >
              <h3 className="text-xl font-semibold mb-1">{marathon.title}</h3>
              <p
                className="mb-3 text-highlight"
                
              >
                {marathon.location}
              </p>
              <p className="mb-1">
                <span className="font-medium">Registration:</span>
                {marathon.startRegistrationDate} – {marathon.endRegistrationDate}
              </p>
              <p className="mb-5">
                <span className="font-medium">Marathon:</span>
                {marathon.marathonStartDate}
              </p>
              <button
                onClick={() => handleRegister(marathon.title)}
                className="mt-auto py-2 rounded-lg font-semibold border transition-colors bg-button text-surfaceColor cursor-pointer hover:bg-button-hover">
                Register
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </section>
  );
};

export default UpcomingMarathons;
