const getFormData = (evt: SubmitEvent): void => {
  evt.preventDefault();
  const formData = new FormData(evt.target as HTMLFormElement);
  for(const [name, value] of formData) {
    console.log(`${name}: ${value}`);
  }
}

export default getFormData;
