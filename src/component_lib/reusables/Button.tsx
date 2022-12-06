import { Optional } from "../../utils/types";

interface Props {
  text: number | string;
  width: String;
  bg: string | null;
  onClick: any;
  disabled: boolean;
}

type ExtendedProps = Optional<Props, "width" | "bg" | "disabled" | "onClick">;

const Button = ({ text, width, bg, onClick, disabled }: ExtendedProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`${width || "w-20"} ${bg || "bg-slate-300"} shadow-inner`}
    data-testid="reusable-button"
  >
    {text}
  </button>
);

export default Button;
