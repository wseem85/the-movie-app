import { useEffect, useState } from "react";
import Logo from "./Logo";
import MenuButton from "./MenuButton";
import NavList from "./NavList";

export default function Header() {
  // const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showMenu, setShowMenu] = useState(() => {
    return window.innerWidth < 640 ? false : true;
  });

  useEffect(function () {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <header className="flex h-12   flex-row items-center justify-between gap-5 bg-tealgrey px-4">
      <Logo />
      {window.innerWidth < 640 && <MenuButton onOpenMenu={setShowMenu} />}
      {showMenu && <NavList setShowMenu={setShowMenu} />}
    </header>
  );
}
