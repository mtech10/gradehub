// Ensure we clean up trailing slashes from the env variable just in case
const RAW_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const BASE_URL = RAW_BASE_URL.replace(/\/+$/, "");

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("gradehub_token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Ensure endpoint starts with a single slash
  const formattedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;

  const response = await fetch(`${BASE_URL}${formattedEndpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

const api = {
  get(endpoint) {
    return request(endpoint);
  },

  post(endpoint, body) {
    return request(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  put(endpoint, body) {
    return request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  patch(endpoint, body) {
    return request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  delete(endpoint) {
    return request(endpoint, {
      method: "DELETE",
    });
  },
};

export default api;
