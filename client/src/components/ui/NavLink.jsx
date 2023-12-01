import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NavLink({ href, title, className }) {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <Link
      to={href}
      className={`text-lg font-semibold hover:text-black hover:bg-[#D1D3D5] ${
        // show active nav link on page changes
        location.pathname === href ? "bg-[#D1D3D5]" : ""
      } ${className}`}
    >
      {t(`${title}`)}
    </Link>
  );
}

export default NavLink;
