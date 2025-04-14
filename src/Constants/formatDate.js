const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0"); // "06"
  const month = String(date.getMonth() + 1).padStart(2, "0"); // "4" (no leading zero)
  const year = String(date.getFullYear()).slice(-2); // "25" (last 2 digits)

  return `${day}-${month}-${year}`; // "06-4-25"
};

export default formatDate;
