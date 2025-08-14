interface Button {
  label: string;
  onClick: () => void;
}

interface FunctionButtonsProps {
  buttons: Button[];
}

export const FunctionButtons = ({ buttons }: FunctionButtonsProps) => (
  <>
    {buttons.map((btn, idx) => (
      <button
        key={btn.label + idx}
        className="mt-3 ms-3 rounded-lg bg-blue-950 text-white px-4 py-2 hover:bg-blue-800 transition-colors duration-200"
        onClick={btn.onClick}
      >
        {btn.label}
      </button>
    ))}
  </>
);

export default FunctionButtons;
