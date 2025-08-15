import { useContext } from "react";
import { SettingsContext, ItemsContext } from "./utils/AlgorithmsContext";

export const AlgorithmsMain = () => {
  const { items } = useContext(ItemsContext);
  const { settings } = useContext(SettingsContext);
  return (
    <section className="row-span-5">
      <div className="flex w-full h-full items-end overflow-hidden">
        {items.map((items, idx) => (
          <div
            key={`${items}-${settings.arrayLength}-${idx}`}
            className="flex-1"
            style={{ backgroundColor: "#172554", height: `${items / 7}%` }}
            id={`${idx}`}
          />
        ))}
      </div>
    </section>
  );
};
