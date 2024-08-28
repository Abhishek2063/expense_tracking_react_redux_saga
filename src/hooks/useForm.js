// hooks/useForm.js
import { useState, useCallback } from "react";

const useForm = (initialState, validationRules) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validateField = useCallback(
    (name, value, allValues) => {
      let error = null;

      // Additional check for password and confirm password
      if (name === "confirm_password" || name === "password") {
        const passwordValue = name === "password" ? value : allValues.password;
        const confirmPasswordValue =
          name === "confirm_password" ? value : allValues.confirm_password;

        if (
          passwordValue &&
          confirmPasswordValue &&
          passwordValue !== confirmPasswordValue
        ) {
          error = "Passwords do not match";
        }
      }

      // Custom validation for category_id
      if (name === "category_id" && (!value || value === "")) {
        error = "Category is required";
      }
      // Custom validation for date
      else if (name === "date" && (!value)) {
        error = "Valid date is required";
      } else {
        error = validationRules[name]
          ? validationRules[name](value, allValues)
          : null;
      }

      return error;
    },
    [validationRules]
  );

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setValues((prevValues) => {
        const newValues = { ...prevValues, [name]: value };
        const error = validateField(name, value, newValues);
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error,
          ...(name === "password" || name === "confirm_password"
            ? {
                confirm_password: validateField(
                  "confirm_password",
                  newValues.confirm_password,
                  newValues
                ),
              }
            : {}),
        }));
        return newValues;
      });
    },
    [validateField]
  );

  const handleSubmit = useCallback(
    (onSubmit) => (e) => {
      e.preventDefault();
      const formErrors = Object.keys(values).reduce((acc, key) => {
        const error = validateField(key, values[key], values);
        return { ...acc, [key]: error };
      }, {});

      setErrors(formErrors);

      if (Object.values(formErrors).every((error) => !error)) {
        onSubmit(values);
      }
    },
    [values, validateField]
  );

  const reset = useCallback(() => {
    setValues(initialState);
    setErrors({});
  }, [initialState]);

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    reset,
    setValues,
  };
};

export default useForm;
