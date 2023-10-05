import { useSelector } from "react-redux";
import NavLink from "../ui/NavLink";

function Navbar() {
  // check for user is logged in and user role
  const { isLoggedIn, role } = useSelector((state) => state?.auth);

  return (
    <>
      {isLoggedIn && role === "ADMIN" && (
        <li>
          <NavLink href="/admin/dashboard" title="Admin Dashbord" />
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
              href="/user/account"
              title="My Profile"
              className="bg-orange-300"
            />
          </li>
          <li>
            <NavLink href="#" title="Logout" className="bg-red-400 lg:hidden" />
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
    </>
  );
}

export default Navbar;
