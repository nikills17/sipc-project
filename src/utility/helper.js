export const getDate = date => {
  let d = new Date(date);
  let day = d.getDate() > 9 ? d.getDate() : '0' + d.getDate();
  let month = d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth()+1);
  let year = d.getFullYear();
  let newDate = month + '-' + day + '-' + year;
  return newDate;
};
