import React, { useContext } from "react";
import { SettingsContext, type AlgorithmType } from "./utils/AlgorithmsContext";

const Nav = () => {
  const { sort, settings, setSettings } = useContext(SettingsContext);

  const onArrayChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!setSettings) return;
    setSettings((c) => ({ ...c, arrayLength: +e.target.value * 5 }));
  };

  const onDelayChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!setSettings) return;
    setSettings((c) => ({ ...c, delay: +e.target.value }));
  };

  const onAlgorithmChange = (type: AlgorithmType) => {
    if (!setSettings) return;
    setSettings((c) => ({ ...c, algorithmType: type }));
  };

  return (
    <nav className="max-w-2xl mx-auto rounded-lg shadow-lg bg-blue-950 grid grid-flow-row">
      <div className="flex items-center justify-center w-full my-2 gap-5">
        <div>
          <button
            className={`border border-teal-100 shadow-md py-2 px-4 transition-all active:scale-95 ${
              settings.algorithmType === "mergeSort" && "text-purple-500"
            }`}
            onClick={() => onAlgorithmChange("mergeSort")}
          >
            Merge Sort
          </button>
          <button
            className={`border border-teal-100 shadow-md py-2 px-4 transition-all active:scale-95 ${
              settings.algorithmType === "insertionSort" && "text-purple-500"
            }`}
            onClick={() => onAlgorithmChange("insertionSort")}
          >
            Insertion Sort
          </button>
        </div>
        <button
          className="underline"
          onClick={() => sort(settings.algorithmType)}
        >
          Sort
        </button>
      </div>
      <div className="flex flex-col items-center justify-center w-full my-2 gap-5">
        <label htmlFor="itemsAmount">
          Array Length: {settings.arrayLength}
        </label>
        <input
          type="range"
          name="itemsAmount"
          id="itemsAmount"
          className="w-full max-w-2xl"
          defaultValue={25}
          min={1}
          onChange={onArrayChange}
        />
        <label htmlFor="delay">Delay: {settings.delay}</label>
        <input
          type="range"
          name="delay"
          id="delay"
          className="w-full max-w-2xl"
          defaultValue={15}
          min={1}
          onChange={onDelayChange}
        />
      </div>
    </nav>
  );
};

export default Nav;
