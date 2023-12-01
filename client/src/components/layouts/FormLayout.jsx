import { useTranslation } from "react-i18next";

import "../../styles/components/FormLayout.scss";

function FormLayout({ children, title, onSubmit, className, classname }) {
  const { t } = useTranslation()

  return (
    <main className={`form ${classname}`}>
      <form noValidate onSubmit={onSubmit} className={className}>
        <h1 className="title">{t(`${title}`)}</h1>
        {children}
      </form>
    </main>
  );
}

export default FormLayout;
