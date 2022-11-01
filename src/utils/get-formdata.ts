const getFormData = (e: SubmitEvent): void => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  [...formData].forEach(([name, value]) => {
    // eslint-disable-next-line no-console
    console.log(`${name}: ${value}`);
  });
};

export default getFormData;
