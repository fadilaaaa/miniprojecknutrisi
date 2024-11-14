"use client";
const saveUserData = (userData) => {
  localStorage.setItem("userData", JSON.stringify(userData));
};
const getUserData = () => {
  return JSON.parse(localStorage.getItem("userData"));
};
export { saveUserData, getUserData };
