import DropDownList from "./DropDownList";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-6 bg-tealgrey px-4 py-4">
      <Logo />
      <DropDownList
        title="this app Made up with"
        items={["React", "Tailwindcss"]}
      ></DropDownList>

      <p>All Rights Reserved</p>
    </footer>
  );
}
