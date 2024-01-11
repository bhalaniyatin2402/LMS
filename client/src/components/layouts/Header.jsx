import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import Alert from "../ui/Alert";

function Header() {
  const locaton = useLocation();
  const navigate = useNavigate();

  // drawer closed when the page changes
  useEffect(() => {
    const element = document.getElementById("my-drawer-3");
    element.checked = false;
  }, [locaton]);

  return (
    <header className="w-full max-w-[1296px] mx-auto">
      <div className="drawer z-20">
        <Alert />
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-[#e5e6e6]">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            {/* header logo */}
            <div
              className="flex-1 px-2 mx-2 text-3xl tracking-wide font-bold text-blue-500 lg:ml-14 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Coursify
            </div>
            <div className="flex-none hidden lg:block">
              {/* nav items shows in navbar  */}
              <ul className="menu menu-horizontal space-x-2 lg:mr-12">
                <Navbar />
              </ul>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          {/* nav items shows in drawer in mobile view */}
          <ul className="menu p-4 w-56 sm:w-80 min-h-full bg-[#D1D3D5] space-y-2">
            <Navbar />
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
