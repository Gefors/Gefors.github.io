import Logo from "../../assets/Logo.png";

function Bottom() {
  return (
    <div className="flex items-center w-full py-4 bg-gradient-to-r from-blue-950 to-sky-200">
      <img
        src={Logo}
        alt="A logotype for the website"
        className="h-8 w-auto rounded-full ml-10"
        style={{ objectFit: "contain" }}
      />
      <h1 className="flex items-center text-3xl tracking-wider font-bold font-mono text-white mx-auto">
        <span className="text-2xl">By Teo Gefors</span>
      </h1>
    </div>
  );
}

export default Bottom;
