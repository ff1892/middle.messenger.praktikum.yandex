export const getTimeFromDate = (date) => {
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  return `${hours}:${minutes}`;
}

export const getCurrentTime = () => {
  return getTimeFromDate(new Date());
}
