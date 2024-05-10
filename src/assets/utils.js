function formatDate(apiDate) {
  const date = new Date(apiDate);
  const format = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", format);
  return formattedDate;
}

function findUser(item, users) {
  const userIndex = users.findIndex((user) => {
    return user.username === item.author;
  });
  const user = users[userIndex];
  return user;
}

export { formatDate, findUser };
