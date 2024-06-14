import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseCircleFill } from "react-icons/ri";
import { animated } from "@react-spring/web";
export default function NavList({ setShowMenu }) {
  const [isOpen, setIsOpen] = useState(true); // Track open/close state
  const navRef = useRef(null); // Ref for DOM element
  function handleVisitpage() {
    if (window.innerWidth < 640) {
      setIsOpen(false);
      setTimeout(() => {
        setShowMenu(false);
      }, 300);
    }
  }
  const handleCloseMenu = () => {
    setIsOpen(false); // Trigger closing animation
    setTimeout(() => {
      setShowMenu(false);
    }, 300);
  };

  return (
    <animated.ul
      ref={navRef}
      className={`sm:max-h-100 font-500 absolute  left-0 top-0 flex h-72 w-screen flex-col items-center bg-slate-100 pt-4   tracking-wider text-zinc-950  transition-all  sm:relative sm:h-auto sm:w-auto sm:flex-row  sm:content-end
sm:justify-end sm:gap-5 sm:bg-transparent sm:py-0 ${isOpen ? "animate-movein" : "animate-moveout"}`}
    >
      {window.innerWidth < 640 && (
        <button
          onClick={handleCloseMenu}
          className="mb-2 me-2 h-9 w-9  self-end rounded-full bg-zinc-700 text-slate-100"
        >
          <RiCloseCircleFill className="h-[36px] w-[36px]" />
        </button>
      )}
      <li className="border-1 w-full border-t border-gray-300 py-3 ps-2 sm:w-fit sm:border-none">
        <NavLink
          className=" w-100 h-100 block"
          to="/"
          onClick={handleVisitpage}
        >
          Home
        </NavLink>
      </li>
      <li className="border-1 w-full border-t border-gray-300 py-3 ps-2 sm:w-fit sm:border-none">
        <NavLink
          className="w-100 h-100 block"
          to="watched"
          onClick={handleVisitpage}
        >
          Watched
        </NavLink>
      </li>
      <li className="border-1 w-full border-y border-gray-300 py-3 ps-2 sm:w-fit sm:border-none">
        <NavLink
          className="w-100 h-100 block"
          to="towatch"
          onClick={handleVisitpage}
        >
          To Watch
        </NavLink>
      </li>
    </animated.ul>
  );
}
