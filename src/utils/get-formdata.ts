const getFormData = (evt: SubmitEvent): void => {
  evt.preventDefault();
  const formData = new FormData(evt.target as HTMLFormElement);
  [...formData].forEach(([name, value]) => {
    // eslint-disable-next-line no-console
    console.log(`${name}: ${value}`);
  });
};

export default getFormData;
