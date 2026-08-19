import './FormField.css';

const FormField = ({
  label,
  htmlFor,
  children,
}) => {
  return (
    <div className="form-field">
      {label && (
        <label
          htmlFor={htmlFor}
          className="form-field__label"
        >
          {label}
        </label>
      )}

      {children}
    </div>
  );
};

export default FormField;