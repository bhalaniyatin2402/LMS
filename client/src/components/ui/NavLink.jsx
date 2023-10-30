import { Link, useLocation } from "react-router-dom";

function NavLink({ href, title, className }) {
  const location = useLocation();

  return (
    <Link
      to={href}
      className={`text-lg font-semibold hover:text-black hover:bg-[#D1D3D5] ${
        // show active nav link on page changes
        location.pathname === href ? "bg-[#D1D3D5]" : ""
      } ${className}`}
    >
      {title}
    </Link>
  );
}

export default NavLink;
