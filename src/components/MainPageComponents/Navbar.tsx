interface NavbarProps {
  readonly currentPage: string;
  readonly setCurrentPage: (page: string) => void;
}

function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const handleNavClick = (page: string, event: React.MouseEvent) => {
    event.preventDefault();
    setCurrentPage(page);
  };

  return (
    <nav className="navbar">
      <ul className="flex items-center font-mono justify-between p-3 bg-blue-950 text-white">
        <li>
          <a
            href="#home"
            onClick={(e) => handleNavClick("home", e)}
            className={`hover:text-blue-300 transition-colors duration-200 ${
              currentPage === "home" ? "text-blue-300 font-bold" : ""
            }`}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#ai"
            onClick={(e) => handleNavClick("ai", e)}
            className={`hover:text-blue-300 transition-colors duration-200 ${
              currentPage === "ai" ? "text-blue-300 font-bold" : ""
            }`}
          >
            AI
          </a>
        </li>
        <li>
          <a
            href="#API:s"
            onClick={(e) => handleNavClick("API:s", e)}
            className={`hover:text-blue-300 transition-colors duration-200 ${
              currentPage === "API:s" ? "text-blue-300 font-bold" : ""
            }`}
          >
            API:s
          </a>
        </li>
        <li>
          <a
            href="#algorithms"
            onClick={(e) => handleNavClick("algorithms", e)}
            className={`hover:text-blue-300 transition-colors duration-200 ${
              currentPage === "algorithms" ? "text-blue-300 font-bold" : ""
            }`}
          >
            Algorithms
          </a>
        </li>
        <li>
          <a
            href="#contact"
            onClick={(e) => handleNavClick("contact", e)}
            className={`hover:text-blue-300 transition-colors duration-200 ${
              currentPage === "contact" ? "text-blue-300 font-bold" : ""
            }`}
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
