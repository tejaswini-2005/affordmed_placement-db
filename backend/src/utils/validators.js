export const cleanString = (value) => String(value || "").trim();

export const normalizeEmail = (email) => cleanString(email).toLowerCase();

export const normalizeDepartment = (department) =>
  cleanString(department).toUpperCase();

export const normalizeStatus = (status) =>
  cleanString(status).toLowerCase();

export const cleanSkills = (skills) => {
  if (!Array.isArray(skills)) return [];

  return skills
    .map((skill) => cleanString(skill))
    .filter((skill) => skill.length > 0);
};

export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidCGPA = (cgpa) => {
  const value = Number(cgpa);
  return !Number.isNaN(value) && value >= 0 && value <= 10;
};

export const isValidPhone = (phone) => {
  return /^[0-9]{10}$/.test(phone);
};

export const isValidGraduationYear = (year) => {
  const value = Number(year);
  return value >= 2020 && value <= 2035;
};

export const isValidStatus = (status) => {
  return ["active", "inactive"].includes(status);
};