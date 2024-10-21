export const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

export const formatDateTime = (dateTime) => {
  if (!dateTime || typeof dateTime !== "string") {
    // Handle the case where dateTime is not defined or is not a string
    return "Invalid date";
  }

  const [date, time] = dateTime.split(" ");
  const [year, month, day] = date.split("-");
  // If you expect time but it's missing, you can handle that too
  return `${day}/${month}/${year}`;
};
