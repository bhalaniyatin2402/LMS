import "../../styles/components/FormLayout.scss";

function FormLayout({ children, title, onSubmit, className, classname }) {
  return (
    <main className={`form ${classname}`}>
      <form noValidate onSubmit={onSubmit} className={className}>
        <h1 className="title">{title}</h1>
        {children}
      </form>
    </main>
  );
}

export default FormLayout;
