function Checkbox({
  options,
  values,
  name,
  filterTitle,
  setFieldValue,
  className,
}) {
  return (
    <div className={`filter ${className}`}>
      <h2>{filterTitle}</h2>
      {options?.map((option) => (
        <label htmlFor={option} key={option}>
          <input
            type="checkbox"
            name={name}
            value={option}
            checked={values[name].includes(option)}
            id={option}
            onChange={() => {
              const selectedOptions = [...values[name]];
              if (selectedOptions.includes(option)) {
                selectedOptions.splice(selectedOptions.indexOf(option), 1);
              } else {
                selectedOptions.push(option);
              }
              setFieldValue(name, selectedOptions);
            }}
          />
          &nbsp;&nbsp;
          {option}
          <br />
        </label>
      ))}
    </div>
  );
}

export default Checkbox;
