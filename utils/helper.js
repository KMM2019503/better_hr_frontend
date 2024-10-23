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

export const calculateYearsFromDate = (joiningDateStr) => {
  if (!joiningDateStr) return "N/A";
  const joiningDate = new Date(joiningDateStr);
  const currentDate = new Date();
  const timeDiff = currentDate - joiningDate;

  if (timeDiff < 0) return "N/A";

  // Calculate years, months, and days
  const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
  );

  return `${years} years, ${months} months`;
};
