const getFormData = (e: SubmitEvent): Record<string, any> => {
  const formData = new FormData(e.target as HTMLFormElement);
  const data: Record<string, any> = {};
  [...formData].forEach(([key, value]) => {
    data[key] = value;
  });
  return data;
};

export { getFormData };
