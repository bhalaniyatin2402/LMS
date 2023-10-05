import { BsFacebook, BsLinkedin, BsYoutube } from "react-icons/bs";

function Footer() {
  const time = new Date();
  const year = time.getFullYear();

  return (
    <footer className=" flex flex-col gap-4 px-4 lg:flex-row items-center justify-between sm:px-36 py-6 bg-neutral text-neutral-content">
      <p className="text-md sm:text-lg">
        Copyright © {year} - All right reserved
      </p>
      <div className="icons w-fit flex-row flex justify-center items-end space-x-8">
        <span className="text-2xl hover:text-gray-500 cursor-pointer">
          <BsFacebook />
        </span>
        <span className="text-2xl hover:text-gray-500 cursor-pointer">
          <BsYoutube />
        </span>
        <span className="text-2xl hover:text-gray-500 cursor-pointer">
          <BsLinkedin />
        </span>
      </div>
    </footer>
  );
}

export default Footer;
