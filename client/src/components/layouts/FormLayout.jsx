import "../../styles/components/FormLayout.scss";

function FormLayout({ children, title, onSubmit }) {
  return (
    <main className="form">
      <form noValidate onSubmit={onSubmit}>
        <h1 className="title">{title}</h1>
        {children}
      </form>
    </main>
  );
}

export default FormLayout;
