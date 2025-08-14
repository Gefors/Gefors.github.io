import Logo from "../../assets/Me.jpg";

function Header() {
  return (
    <div className="relative flex items-center w-full py-4 bg-gradient-to-r from-sky-200 to-blue-950">
      <div className="flex flex-row items-center mx-10">
        <img
          src={Logo}
          alt="A logotype for the website"
          className="h-20 rounded-full"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-center text-3xl tracking-wider font-bold font-mono text-white">
          Welcome to my website! <br />
          <span className="text-2xl">By Teo Gefors</span>
        </h1>
      </div>
    </div>
  );
}

export default Header;
