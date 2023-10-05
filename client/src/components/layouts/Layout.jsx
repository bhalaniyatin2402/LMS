function Layout({ children, className }) {
  return (
    <div className={`${className} w-full h-full inline-block z-0 p-5 m-auto`}>
      {children}
    </div>
  );
}

export default Layout;
