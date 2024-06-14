import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

export default function DropDownList({ items, title }) {
  const [isDropped, setIsDropped] = useState(false);
  return (
    <div className="flex flex-col gap-5 ">
      <div className="flex w-full flex-row items-center gap-4">
        <h3>{title}</h3>
        <button
          onClick={() => setIsDropped((dropped) => !dropped)}
          className="flex h-12 w-12 content-center items-center bg-transparent p-2"
        >
          {isDropped ? (
            <MdOutlineKeyboardArrowUp className="leading-12 h-12 w-12" />
          ) : (
            <MdOutlineKeyboardArrowDown className="leading-12 h-12 w-12" />
          )}
        </button>
      </div>
      {isDropped && (
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
