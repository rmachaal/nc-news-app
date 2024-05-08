function formatDate(apiDate) {
  const date = new Date(apiDate);
  const format = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", format);
  return formattedDate;
}

export default formatDate