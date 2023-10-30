function Loader({ className, classname }) {
  return (
    <main
      className={`h-[80vh] bg-[#e5e6e6] flex justify-center items-center ${classname}`}
    >
      <svg
        className={`animate-spin h-28 mr-3 border-4 border-t-0 border-r-0 border-purple-500 rounded-full ${className}`}
        viewBox="0 0 24 24"
      ></svg>
    </main>
  );
}

export default Loader;
