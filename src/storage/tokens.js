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

// Get the access token from cookies
export function getToken() {
  if (typeof window !== "undefined") {
    return getCookie("ACCESS_TOKEN");
  }
}

// Set the access token in cookies
export function setToken(token) {
  if (typeof window !== "undefined") {
    eraseCookie("ACCESS_TOKEN");
    setCookie("ACCESS_TOKEN", token, 1); // 1 days expiration (adjust as needed)
    return token;
  }
}

// Remove specific data from cookies
export function removeLocalData() {
  if (typeof window !== "undefined") {
    eraseCookie("ACCESS_TOKEN");
    eraseCookie("typeData");
    eraseCookie("entityData");
    return true;
  }
}

// Get the verify token from cookies
export function getVerifyToken() {
  if (typeof window !== "undefined") {
    return getCookie("VERIFY_TOKEN");
  }
}

// Set the verify token in cookies
export function setVerifyToken(token) {
  if (typeof window !== "undefined") {
    eraseCookie("VERIFY_TOKEN");
    setCookie("VERIFY_TOKEN", token, 1); // 1 days expiration (adjust as needed)
    return token;
  }
}
