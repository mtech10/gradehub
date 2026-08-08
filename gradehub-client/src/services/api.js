const RAW_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const BASE_URL = RAW_BASE_URL.replace(/\/+$/, "");

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("gradehub_token");

  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const formattedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;

  const response = await fetch(`${BASE_URL}${formattedEndpoint}`, {
    ...options,
    headers,
    body:
      isFormData || typeof options.body === "string"
        ? options.body
        : options.body
          ? JSON.stringify(options.body)
          : undefined,
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
      body,
    });
  },

  postForm(endpoint, formData) {
    return request(endpoint, {
      method: "POST",
      body: formData,
    });
  },

  put(endpoint, body) {
    return request(endpoint, {
      method: "PUT",
      body,
    });
  },

  patch(endpoint, body) {
    return request(endpoint, {
      method: "PATCH",
      body,
    });
  },

  delete(endpoint) {
    return request(endpoint, {
      method: "DELETE",
    });
  },
};

export default api;
