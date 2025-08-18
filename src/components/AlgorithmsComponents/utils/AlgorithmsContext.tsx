import { createContext, useEffect, useState } from "react";
import { getInsertionSortAnimations } from "./insertionSort";
import { getMergeSortAnimations } from "./mergeSort";

const initialSettings: Settings = {
  algorithmType: "mergeSort",
  arrayLength: 25,
  delay: 15,
};

interface Props {
  children: React.ReactNode;
}

export type AlgorithmType = "mergeSort" | "insertionSort";

interface Settings {
  algorithmType: AlgorithmType;
  arrayLength: number;
  delay: number;
}

type SettingsContextType = {
  settings: Settings;
  setSettings?: React.Dispatch<React.SetStateAction<Settings>>;
  sort: (algorithmType: AlgorithmType) => void;
};

export const SettingsContext = createContext<SettingsContextType>({
  settings: initialSettings,
  sort: (_algorithmType) => {},
});

type ItemsContextType = {
  items: number[];
  setItems?: React.Dispatch<React.SetStateAction<number[]>>;
};
export const ItemsContext = createContext<ItemsContextType>({ items: [] });

export const AlgorithmsContext: React.FC<Props> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [items, setItems] = useState<number[]>([]);

  useEffect(() => {
    const randomNumbers = [];
    for (let i = 0; i < settings.arrayLength; i++) {
      randomNumbers.push(Math.floor(Math.random() * 540));
    }
    setItems(randomNumbers);
  }, [settings.arrayLength]);

  const sort = (algorithmType: AlgorithmType) => {
    switch (algorithmType) {
      case "insertionSort":
        const { newArray, animationsArray } = getInsertionSortAnimations(items);
        animateDivs(newArray, animationsArray);
        console.log(newArray);
        break;
      case "mergeSort":
        const aux: number[] = [];
        const arr: number[][] = [];
        const itemsCopy = [...items];
        getMergeSortAnimations(itemsCopy, aux, arr, 0, items.length - 1);
        animateMerge(itemsCopy, arr);
        console.log(itemsCopy);
        break;
      default:
        break;
    }
  };

  const animateMerge = (newArray: number[], arr: number[][]) => {
    arr.forEach(([newHight, idx], index) => {
      const div = document.getElementById(`${idx}`);
      if (!div) return;
      setTimeout(() => {
        div.style.backgroundColor = "#fffbeb";
        div.style.height = `${newHight / 7}%`;
        setTimeout(() => {
          div.style.backgroundColor = "#172554";
          if (index === arr.length - 1) {
            setItems(newArray);
          }
        }, settings.delay * 2);
      }, settings.delay * index * 2);
    });
  };

  const animateDivs = (newArray: number[], arr: number[][]) => {
    arr.forEach(([first, second], index) => {
      const div = document.getElementById(`${first}`);
      const div2 = document.getElementById(`${second}`);
      if (!div || !div2) return;
      setTimeout(() => {
        div.style.backgroundColor = "#fffbeb";
        div2.style.backgroundColor = "#fffbeb";
        const divHeight = div.style.height;
        div.style.height = div2.style.height;
        div2.style.height = divHeight;
        setTimeout(() => {
          div.style.backgroundColor = "#172554";
          div2.style.backgroundColor = "#172554";
          if (index === arr.length - 1) {
            setItems(newArray);
          }
        }, settings.delay * 2);
      }, settings.delay * index * 2);
    });
  };

  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      <SettingsContext.Provider value={{ sort, settings, setSettings }}>
        {children}
      </SettingsContext.Provider>
    </ItemsContext.Provider>
  );
};
