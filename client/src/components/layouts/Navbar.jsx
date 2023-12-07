import { useSelector } from "react-redux";
import { IoLanguage } from "react-icons/io5";
import { changeLanguage } from "i18next";

import NavLink from "../ui/NavLink";

function Navbar() {
  // check for user is logged in and user role
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  return (
    <>
      {isLoggedIn && role === "ADMIN" && (
        <li>
          <NavLink href="/admin/dashboard" title="Admin Dashboard" />
        </li>
      )}
      <li>
        <NavLink href={"/"} title="Home" />
      </li>
      <li>
        <NavLink href={"/courses"} title="All Courses" />
      </li>
      <li>
        <NavLink href={"/about"} title="About Us" />
      </li>
      {isLoggedIn ? (
        <>
          <li>
            <NavLink
              href="/user/profile"
              title="My Profile"
              className="bg-orange-300"
            />
          </li>
        </>
      ) : (
        <li>
          <NavLink
            href="/login"
            title="Login/Register"
            className="bg-orange-300"
          />
        </li>
      )}
      <li className="a my-auto">
        <details>
          <summary>
            <IoLanguage className="text-xl" />
          </summary>
          <ul className="bg-[#F2F2F2] rounded-lg">
            <li onClick={() => changeLanguage("en")}>
              <a className="mx-auto">English</a>
            </li>
            <li onClick={() => changeLanguage("guj")}>
              <a className="mx-auto">ગુજરાતી</a>
            </li>
            <li onClick={() => changeLanguage("hn")}>
              <a className="mx-auto">हिन्दी</a>
            </li>
          </ul>
        </details>
      </li>
    </>
  );
}

export default Navbar;
