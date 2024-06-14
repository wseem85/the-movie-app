import { MdOutlineMenu } from "react-icons/md";
export default function MenuButton({ onOpenMenu }) {
  return (
    <button
      onClick={() => onOpenMenu((open) => !open)}
      className="leading-[3rem]"
    >
      <MdOutlineMenu className="h-7 w-7" />
    </button>
  );
}
