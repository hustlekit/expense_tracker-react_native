export const getFormattedDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  const day = date.getDate() < 9 ? '0' + (date.getDate() + 1) : date.getDate() + 1;
  return `${year}-${month}-${day}`;
};

export const getDateMinusDays = (date, days) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}