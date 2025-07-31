export const formatDate = (dateString) => {
  if (!dateString) return '';
  const [dd, mm, yyyy] = dateString.split('/');
  if (!dd || !mm || !yyyy) return dateString;

  const pad = (n) => n.toString().padStart(2, '0');
  return `${yyyy}-${pad(mm)}-${pad(dd)}`;
};
