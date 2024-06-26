import jwtDecode from "jwt-decode";

const API_URL = "http://localhost:5000";

const ACCESS_TOKEN_KEY = "accessToken";

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export async function login(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    return null;
  }
  const { token } = await response.json();
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
  // return getUserFromToken(token);
}


function getUserFromToken(){
    
}