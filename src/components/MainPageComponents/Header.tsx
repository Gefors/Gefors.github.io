function Header() {
  return (
    <div className="relative flex items-center w-full py-4 bg-gradient-to-r from-blue-950 to-sky-200 h-24">
      <div className="flex flex-row items-center mx-10"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-center text-3xl tracking-wider font-bold font-mono text-white">
          Welcome to my website! <br />
        </h1>
      </div>
    </div>
  );
}

export default Header;
