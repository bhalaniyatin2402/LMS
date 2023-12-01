import { useTranslation } from "react-i18next";

function FormInput({
  name,
  onChange,
  values,
  touched,
  errors,
  placeholder,
  type,
}) {
  const { t } = useTranslation();

  return (
    <>
      <input
        className={`input input-sm input-info bg-white w-[80vw] sm:w-[350px] max-w-md p-2 sm:p-4 mt-5 text-sm sm:text-lg font-medium tracking-widest`}
        id={name}
        name={name}
        type={type || name}
        onChange={onChange}
        value={values[name]}
        placeholder={placeholder ? t(`${placeholder}`) : t(`${name}`)}
      />
      {touched[name] && errors[name] ? (
        <span className="text-sm mr-auto text-red-900 w-auto sm:w-[270px]">
          {t(`${errors[name]}`)}
        </span>
      ) : null}
    </>
  );
}

export default FormInput;
