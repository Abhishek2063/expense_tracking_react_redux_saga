// Helper function to set a cookie
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Helper function to get a cookie
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Helper function to delete a cookie
function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

// Set user details in a cookie
export function setUserDetails(data) {
  const encodedData = btoa(JSON.stringify(data));
  setCookie("typeData", encodedData, 7); // 7 days expiration (adjust as needed)
}

// Clear user details cookie
export function clearUserDetails() {
  eraseCookie("typeData");
}

// Get user details from cookie
export const getUserDetails = () => {
  const encodedData = getCookie("typeData");
  if (!encodedData) {
    return "";
  }
  try {
    const userData = JSON.parse(atob(encodedData));
    return userData;
  } catch (e) {
    return "";
  }
};

// Set entity data in a cookie
export function setEntityData(data) {
  const encodedData = btoa(JSON.stringify(data));
  setCookie("entityData", encodedData, 7); // 7 days expiration (adjust as needed)
}

// Get entity data from cookie
export const getEntityData = () => {
  const encodedData = getCookie("entityData");
  if (!encodedData) {
    return "";
  }
  try {
    const entityData = JSON.parse(atob(encodedData));
    return entityData;
  } catch (e) {
    return "";
  }
}
