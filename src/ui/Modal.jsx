import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

import { useOutsideClick } from "../hooks/useOutsideClick";

export const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 left-0 top-0 z-10 h-screen w-full rounded-lg bg-backdropcolor px-12 py-14 shadow-lg backdrop-blur-sm  transition-all transition-all duration-300 ">
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-extralightblack"
        ref={ref}
      >
        <button
          onClick={close}
          className="translte-x-[0.8rem] absolute right-8 top-6  rounded-sm border-none bg-none p-1 transition-all"
        >
          <HiXMark className="text-gray-100" />
        </button>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
