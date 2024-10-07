
import { Link } from 'react-scroll';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-80 text-white shadow-lg z-10">
      <div className="max-w-screen-lg  flex justify-between items-center py-4 px-6">
        <h1 className="text-xl font-bold ">CodeSync</h1>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="hero"
              smooth={true}
              duration={500}
              className="cursor-pointer text-gray-300  hover:text-white transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="features"
              smooth={true}
              duration={500}
              className="cursor-pointer text-gray-300  hover:text-white  transition duration-300"
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              to="demo"
              smooth={true}
              duration={500}
              className="cursor-pointer text-gray-300  hover:text-white  transition duration-300"
            >
              Live Demo
            </Link>
          </li>
          <li>
            <Link
              to="pricing"
              smooth={true}
              duration={500}
              className="cursor-pointer text-gray-300  hover:text-white  transition duration-300"
            >
              Pricing
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
