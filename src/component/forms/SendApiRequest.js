import getAuthHeaders from "./getAuthHeader";

// ✅ Define your Django server base URL
const school_accronym = localStorage.getItem("school_accronym")
const API_BASE_URL = `http://${school_accronym}.localhost:8000`;

export async function SendApiRequest(endpoint, method = "GET", body = null, extraHeaders = {}) {
  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("token");

  // ✅ Proper URL construction
  const isAbsolute = endpoint.startsWith("http://") || endpoint.startsWith("https://");
  const url = isAbsolute ? endpoint : `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  console.log("🌐 Making request to:", url); // Debug log

  // ✅ Clean headers object
  const headers = {
    "Content-Type": "application/json",
    ...extraHeaders,
  };

  // ✅ Only add Authorization if token exists
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  // ✅ Add auth headers if function returns valid object
  try {
    const authHeaders = getAuthHeaders();
    if (authHeaders && typeof authHeaders === 'object') {
      Object.assign(headers, authHeaders);
    }
  } catch (error) {
    console.warn("Error getting auth headers:", error);
  }

  console.log("📋 Request headers:", headers); // Debug log

  let response;
  try {
    response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    console.log("📡 Response status:", response.status); // Debug log
  } catch (fetchError) {
    console.error("❌ Fetch error:", fetchError);
    throw new Error(`Network error: ${fetchError.message}`);
  }

  // 🔄 Try refreshing if unauthorized
  if (response.status === 401 && refreshToken) {
    console.log("🔄 Token expired, attempting refresh...");
    
    try {
      const refreshResponse = await fetch(`${API_BASE_URL}/user-auth/token/refresh/`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!refreshResponse.ok) {
        console.log("❌ Refresh failed, clearing tokens");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        throw new Error("Session expired, please login again");
      }

      const refreshData = await refreshResponse.json();
      localStorage.setItem("token", refreshData.access);
      console.log("✅ Token refreshed successfully");

      // ✅ Retry with new token and clean headers
      const retryHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshData.access}`,
        ...extraHeaders,
      };

      response = await fetch(url, {
        method,
        headers: retryHeaders,
        body: body ? JSON.stringify(body) : null,
      });

      console.log("📡 Retry response status:", response.status);
    } catch (refreshError) {
      console.error("❌ Refresh error:", refreshError);
      throw refreshError;
    }
  }

  // ✅ Handle response
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    
    try {
      const errorData = await response.json();
      errorMessage = `Error ${response.status}: ${errorData.detail || errorData.message || response.statusText}`;
    } catch (parseError) {
      // If we can't parse JSON, use the default message
      console.warn("Could not parse error response as JSON");
    }
    
    throw new Error(errorMessage);
  }

  try {
    return await response.json();
  } catch (parseError) {
    console.error("❌ Failed to parse response as JSON:", parseError);
    throw new Error("Invalid JSON response from server");
  }
}