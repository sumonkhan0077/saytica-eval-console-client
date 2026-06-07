const BASE_URL = "https://saytica-eval-console-backend.vercel.app";

const serverFetchHelper = async (endpoint, options = {}) => {
  return fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
};

const serverFetch = {
  get: (endpoint, options = {}) =>
    serverFetchHelper(endpoint, { ...options, method: "GET" }),

  post: (endpoint, options = {}) =>
    serverFetchHelper(endpoint, { ...options, method: "POST" }),

  put: (endpoint, options = {}) =>
    serverFetchHelper(endpoint, { ...options, method: "PUT" }),

  patch: (endpoint, options = {}) =>
    serverFetchHelper(endpoint, { ...options, method: "PATCH" }),

  delete: (endpoint, options = {}) =>
    serverFetchHelper(endpoint, { ...options, method: "DELETE" }),
};

export default serverFetch;