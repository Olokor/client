import { useNavigate } from "react-router-dom";

export default function UseRefreshToken() {
  const navigate = useNavigate();

  return async (refreshToken) => {
    try {
      const response = await fetch("/user-auth/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        // ❌ Refresh token invalid — force logout
        console.log("removing tokens")
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        navigate("/login");
        return null;
      }

      const data = await response.json();
      localStorage.setItem("token", data.access);
      return data.access;
    } catch (err) {
      console.error("Refresh error:", err);
      // localStorage.removeItem("token");
      // localStorage.removeItem("refresh");
      // console.log("error is from here")
      navigate("/login");
      return null;
    }
  };
}
