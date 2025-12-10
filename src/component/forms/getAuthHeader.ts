import { AuthHeaders } from "../../types";

export default function getAuthHeaders(): AuthHeaders {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
}
