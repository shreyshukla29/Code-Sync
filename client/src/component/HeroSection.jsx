

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-16 px-6 md:px-12">
      <div className="max-w-screen-lg mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to CodeSync
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Collaborate in real-time with developers around the world. Sync your code and creativity effortlessly.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-white text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition duration-300">
            Get Started
          </button>
          <button className="bg-transparent border-2 border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-gray-800 transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
