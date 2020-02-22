export default values => {
  const errors = {};
  const requiredFields = ["name", "description"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });

  if (values.name && values.name.length > 100) {
    errors.name = "Max 100 characters";
  }
  if (values.description && values.description.length > 1000) {
    errors.description = "Max 1000 characters";
  }

  return errors;
};
