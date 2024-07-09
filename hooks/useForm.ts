import { ChangeEventHandler, useState } from "react";

export function useForm<FormField extends string>(
  defaultValues: Record<FormField, string>,
) {
  const [formValues, setFormValues] = useState(defaultValues);

  // Check if the form data has changed from the initial state
  const hasFormChanged = (Object.keys(defaultValues) as FormField[]).some(
    (key) => formValues[key] !== defaultValues[key],
  );

  // Handler for form field changes
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { files, name, value } = event.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: files?.[0] ?? value,
    }));
  };

  const resetField = (field: FormField, value?: string) => {
    setFormValues((prevState) => ({
      ...prevState,
      [field]: value ?? defaultValues[field],
    }));
  };

  const resetForm = () => setFormValues(defaultValues);

  return {
    formValues,
    handleChange,
    hasFormChanged,
    defaultValues,
    resetField,
    resetForm,
  };
}
