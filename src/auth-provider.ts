import { User } from "screens/project-list/search-panel";

const key = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(key);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(key, user.token || "");
  return user;
};

const api = process.env.REACT_APP_API_URL;

export const login = (data: { username: string; password: string }) => {
  return fetch(`${api}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    }
    return Promise.reject(data);
  });
};

export const register = (data: { username: string; password: string }) => {
  return fetch(`${api}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (res: Response) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    }
    return Promise.reject(data);
  });
};

export const logout = async () => window.localStorage.removeItem(key);
